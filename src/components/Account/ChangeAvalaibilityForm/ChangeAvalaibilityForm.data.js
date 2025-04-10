import * as Yup from "yup"

export function initialValues() {
    return {
        availability: "",
    }
}

export function validationSchema() {
    return Yup.object({
        availability: Yup.string().required("Campo obligatorio")
    })
}