import { View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../AddServiceScreen/AddServiceScreen.data";
import { PrincipalImage } from "../../../components/Shared/PrincipalImage/PrincipalImage";
import { InfoForm } from "../../../components/AddService/InfoForm";
import { Button } from "react-native-elements";
import { UploadImageForm } from "../../../components/Shared/UploadImageForm/UploadImageForm";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../utils";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoginScreen } from "../../Account/LoginScreen/LoginScreen"
import { LoadingModal } from "../../../components/Shared/LoadingModal/LoadingModal";

export default function EditServiceScreen() {
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

    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            setServiceData(null);
            try {
                const serviceRef = doc(db, "services", id);
                const serviceSnap = await getDoc(serviceRef);

                if (serviceSnap.exists()) {
                    setServiceData(serviceSnap.data());
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cargar los datos del servicio",
                })
                console.error("Error al cargar los datos del servicio. EditServiceScreen.js", error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const formik = useFormik({
        initialValues: serviceData || initialValues(),
        validationSchema: validationSchema(),
        enableReinitialize: true,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const serviceRef = doc(db, "services", id);
                await updateDoc(serviceRef, {
                    ...formValue,
                    updatedAt: new Date(),
                });

                navigation.goBack();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al editar el servicio.",
                })
                console.error("Error al editar el servicio.");
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
