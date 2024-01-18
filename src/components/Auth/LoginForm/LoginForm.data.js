import * as Yup from "yup"
export function initialValues() {
    return {
        email: "",
        password: "",
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("Email incorrecto").required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
    })
}