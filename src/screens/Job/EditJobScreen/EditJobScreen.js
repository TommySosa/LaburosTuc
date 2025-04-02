import { View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../AddJobScreen/AddJobScreen.data";
import { PrincipalImage } from "../../../components/Shared/PrincipalImage/PrincipalImage";

import { Button } from "react-native-elements";
import { UploadImageForm } from "../../../components/Shared/UploadImageForm/UploadImageForm";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../utils";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginScreen } from "../../Account/LoginScreen/LoginScreen"
import { LoadingModal } from "../../../components/Shared/LoadingModal/LoadingModal";
import { InfoForm } from "../../../components/AddService/InfoForm";

export default function EditJobScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [hasLogged, setHasLogged] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false);
            setUserId(user ? user.uid : null);
        });
    }, []);

    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            setJobData(null);
            try {
                const jobRef = doc(db, "jobs", id);
                const jobSnap = await getDoc(jobRef);

                if (jobSnap.exists()) {
                    setJobData(jobSnap.data());
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cargar los datos del trabajo",
                })
                console.error("Error al cargar los datos del trabajo. EditJobScreen.js", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const formik = useFormik({
        initialValues: jobData || initialValues(),
        validationSchema: validationSchema(),
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const jobRef = doc(db, "jobs", id);
                await updateDoc(jobRef, {
                    ...formValue,
                    updatedAt: new Date(),
                });

                navigation.goBack();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al editar el trabajo.",
                })
                console.error("Error al editar el trabajo.");
            }
        },
    });

    if (hasLogged === null || loading) {
        return <LoadingModal show text="Cargando..." />;
    }

    return (
        <>
            {hasLogged ? (
                <ScrollView>
                    <PrincipalImage formik={formik} />
                    <InfoForm formik={formik} />
                    <UploadImageForm formik={formik} />
                    <View style={{ margin: 20 }}>
                        <Button
                            title="Guardar Cambios"
                            buttonStyle={{ backgroundColor: "#06E092", height: 55 }}
                            onPress={formik.handleSubmit}
                            loading={formik.isSubmitting}
                        />
                    </View>
                </ScrollView>
            ) : (
                <LoginScreen />
            )}
        </>
    );
}
