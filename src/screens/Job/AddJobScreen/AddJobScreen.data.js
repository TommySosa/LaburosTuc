import * as Yup from "yup"

export function initialValues() {
    return {
        description: "",
        name: "",
        schedules: "",
        remuneration: undefined,
        location: null,
        address: "",
        images: []
    }
}

export function validationSchema() {
    return Yup.object({
        description: Yup.string().required("Campo obligatorio"),
        name: Yup.string().required("Campo obligatorio"),
        schedules: Yup.string().required("Campo obligatorio"),
        remuneration: Yup.number().typeError("Ingrese el valor en pesos").required("Campo obligatorio"),
        location: Yup.object().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        images: Yup.array().min(1, "Se requiere una imágen como mínimo").required("Campo obligatorio")
    })
}