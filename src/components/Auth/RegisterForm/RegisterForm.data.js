import * as Yup from "yup"
export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("Email incorrecto").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    })
}