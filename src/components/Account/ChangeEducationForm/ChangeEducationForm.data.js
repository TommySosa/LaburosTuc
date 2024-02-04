import * as Yup from "yup"

export function initialValues() {
    return {
        education: "",
    }
}

export function validationSchema() {
    return Yup.object({
        education: Yup.string().required("Campo obligatorio").max(50, "Superaste el máximo de carácteres (50)")
    })
}