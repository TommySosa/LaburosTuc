import { View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddServiceScreen.data";
import { PrincipalImage } from "../../../components/Shared/PrincipalImage/PrincipalImage";
import { InfoForm } from "../../../components/AddService/InfoForm";
import { styles } from "./AddServiceScreen.styles";
import { Button } from "react-native-elements";
import { UploadImageForm } from "../../../components/Shared/UploadImageForm/UploadImageForm";
import { generateRandomNumber } from "../../../utils/generateRandomNumber";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoadingModal } from "../../../components/Shared/LoadingModal/LoadingModal";
import { LoginScreen } from "../../Account/LoginScreen/LoginScreen";

export default function AddServiceScreen(props) {
  const navigation = useNavigation()
  const [hasLogged, setHasLogged] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
      setUserId(user ? user.uid : null)
    })
  }, [])

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue
        newData.id = generateRandomNumber()
        newData.idUser = userId
        newData.createdAt = new Date()
        newData.remuneration = Number(formValue.remuneration)

        const myDb = doc(db, "services", newData.id)
        await setDoc(myDb, newData)

        navigation.reset({
          index: 0,
          routes: [{ name: 'AddService' }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  })

  if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />
  }

  return (
    <>
      {
        hasLogged ? <ScrollView>
          <PrincipalImage formik={formik} />
          <InfoForm formik={formik} />
          <UploadImageForm formik={formik} isService={true} />
          <View style={styles.buttonsContainer}>
            <Button
              title="Publicar"
              buttonStyle={{
                backgroundColor: "#06E092",
                height: 55
              }}
              containerStyle={{
                width: "100%",
              }}
              titleStyle={{ fontWeight: "bold" }}
              onPress={formik.handleSubmit}
              loading={formik.isSubmitting}
            />
          </View>
        </ScrollView > : <LoginScreen />
      }
    </>

  );
}