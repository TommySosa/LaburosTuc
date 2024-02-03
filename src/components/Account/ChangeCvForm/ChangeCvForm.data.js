import * as Yup from "yup"

export function initialValues() {
    return {
        cv: "",
    }
}

export function validationSchema() {
    return Yup.object({
        cv: Yup.string().required("Campo obligatorio")
    })
}