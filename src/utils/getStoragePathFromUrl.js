export const getStoragePathFromUrl = (imageUrl) => {
    try {
        const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
        const decodedUrl = decodeURIComponent(imageUrl);
        const parts = decodedUrl.split(baseUrl)[1]?.split("/o/")[1]?.split("?")[0];

        return parts ? parts.replace("%2F", "/") : null;
    } catch (error) {
        console.error("Error al obtener la ruta del archivo:", error);
        return null;
    }
};