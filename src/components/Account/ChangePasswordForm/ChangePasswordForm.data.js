import * as Yup from "yup"

export function initialValues() {
    return {
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    }
}

export function validationSchema() {
    return Yup.object({
        password: Yup.string().required("Campo obligatorio"),
        newPassword: Yup.string().required("Campo obligatorio"),
        confirmNewPassword: Yup.string().required("Campo obligatorio")
            .oneOf([Yup.ref("newPassword")], "Las nuevas contraseñas deben ser iguales")
    })
}