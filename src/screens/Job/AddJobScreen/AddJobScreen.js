import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddJobScreen.data";
import { ImageJob } from "../../../components/AddJob/ImageJob/ImageJob";
import { InfoForm } from "../../../components/AddJob/InfoForm/InfoForm";
import { styles } from "./AddJobScreen.styles";
import { Button } from "react-native-elements";
import { UploadImageForm } from "../../../components/Shared/UploadImageForm/UploadImageForm";
import { generateRandomNumber } from "../../../utils/generateRandomNumber";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";

export default function AddJobScreen(props) {
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue
        newData.id = generateRandomNumber()
        newData.createdAt = new Date()

        const myDb = doc(db, "jobs", newData.id)

        await setDoc(myDb, newData)

        navigation.reset({
          index: 0,
          routes: [{ name: 'AddJob' }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <ScrollView>
      <ImageJob formik={formik} />
      <InfoForm formik={formik} />
      <UploadImageForm formik={formik} />
      <View style={styles.buttonsContainer}>
        <Button
          title="Publicar Empleo"
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
    </ScrollView >
  );
}