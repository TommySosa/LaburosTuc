import * as Yup from "yup"

export function initialValues() {
    return {
        interests: "",
    }
}

export function validationSchema() {
    return Yup.object({
        interests: Yup.string().required("Campo obligatorio").max(50, "Superaste el máximo de carácteres (100)")
    })
}