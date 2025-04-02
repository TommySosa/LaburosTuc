import React from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { styles } from "./RegisterForm.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { db, screen } from "../../../utils";
import { doc, setDoc } from "firebase/firestore";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );

        await updateProfile(user, {
          displayName: `${formValue.names.trim()} ${formValue.surnames.trim()}`,
        });

        await user.reload(); // Recargar usuario
        const updatedUser = getAuth().currentUser;

        const defaultUserInfo = {
          displayName: `${formValue.names.trim()} ${formValue.surnames.trim()}`,
          idUser: updatedUser.uid,
          email: updatedUser.email,
          photoURL: "",
          availaibility: "",
          cv: "",
          description: "",
          education: "",
          phone: "",
        };

        const myDb = doc(db, "usersInfo", defaultUserInfo.idUser);
        await setDoc(myDb, defaultUserInfo);

        navigation.navigate(screen.account.completeUserInfo);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, inténtelo más tarde",
        });
        console.log(error);
      }
    },
  });

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Nombres"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="card-account-details-outline"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("names", text)}
        errorMessage={formik.errors.names}
      />
      <Input
        placeholder="Apellidos"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="card-account-details-outline"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("surnames", text)}
        errorMessage={formik.errors.surnames}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title={"Unirse"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
