import * as Yup from "yup"

export function initialValues() {
    return {
        availaibility: "",
    }
}

export function validationSchema() {
    return Yup.object({
        availaibility: Yup.string().required("Campo obligatorio")
    })
}