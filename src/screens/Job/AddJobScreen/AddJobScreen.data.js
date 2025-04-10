import * as Yup from "yup"

export function initialValues() {
    return {
        description: "",
        category: "",
        schedules: "",
        phone: "",
        email: "",
        remuneration: "",
        location: null,
        address: "",
        images: []
    }
}

export function validationSchema() {
    return Yup.object({
        description: Yup.string().required("Campo obligatorio"),
        category: Yup.string().required("Campo obligatorio"),
        schedules: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().matches(/^\d+$/, "El teléfono debe contener solo números"),
        email: Yup.string().email("Email inválido"),
        remuneration: Yup.number().typeError("Ingrese el valor en pesos"),
        location: Yup.object().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        images: Yup.array().max(5, "Se requiere 5 imágenes como máximo")
    })
}