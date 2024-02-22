import * as Yup from "yup"

export function initialValues() {
    return {
        description: "",
        services: [],
        schedules: "",
        location: null,
        address: "",
        images: []
    }
}

export function validationSchema() {
    return Yup.object({
        description: Yup.string().required("Campo obligatorio"),
        services: Yup.array().min(1, "Se requiere un servicio como mínimo").max(10, "Se requiere 10 servicios como máximo").required("Campo obligatorio"),
        schedules: Yup.string().required("Campo obligatorio"),
        location: Yup.object().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        images: Yup.array().max(5, "Se requiere 5 imágenes como máximo")
    })
}