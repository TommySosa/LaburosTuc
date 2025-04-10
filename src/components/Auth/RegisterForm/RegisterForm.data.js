import * as Yup from "yup"
export function initialValues() {
    return {
        email: "",
        password: "",
        names: "",
        surnames: "",
        repeatPassword: "",
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string().email("Email inválido").min(5, "Debe tener al menos 5 caracteres").required("Campo obligatorio"),
        password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Campo obligatorio"),
        names: Yup.string().min(3, "Debe tener al menos 3 caracteres").max(25, "Debe tener como máximo 25 caracteres").required("Campo obligatorio"),
        surnames: Yup.string().min(3, "Debe tener al menos 3 caracteres").max(25, "Debe tener como máximo 25 caracteres").required("Campo obligatorio"),
        repeatPassword: Yup.string().required("Campo obligatorio").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    })
}