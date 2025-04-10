import * as Yup from "yup"

export function initialValues() {
    return {
        description: "",
    }
}

export function validationSchema() {
    return Yup.object({
        description: Yup.string().required("Campo obligatorio").max(250, "Superaste el máximo de carácteres (250)")
    })
}