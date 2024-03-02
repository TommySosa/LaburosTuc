import * as Yup from "yup"
export function initialValues() {
    return {
        education: "",
        description: "",
        availability: "",
        phone: "",
    }
}

export function validationSchema() {
    return Yup.object({
        education: Yup.string().required("Campo obligatorio").max(50, "Superaste el máximo de carácteres (50)"),
        description: Yup.string().required("Campo obligatorio").max(250, "Superaste el máximo de carácteres (250)"),
        availability: Yup.string().required("Campo obligatorio"),
        phone: Yup.number().typeError("Ingresa sólo numeros y sin prefijos").required("Campo obligatorio"),
    })
}