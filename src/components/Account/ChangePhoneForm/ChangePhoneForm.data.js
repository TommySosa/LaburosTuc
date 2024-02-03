import * as Yup from "yup"

export function initialValues() {
    return {
        phone: "",
    }
}

export function validationSchema() {
    return Yup.object({
        phone: Yup.number().typeError("Ingresa sólo numeros y sin prefijos").required("Campo obligatorio")
    })
}