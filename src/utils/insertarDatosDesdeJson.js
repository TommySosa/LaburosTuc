//Esta funcion servira si más adelante los datos de relleno se necesitan insertar a la bd de firebase 

const insertarDatosDesdeJson = async () => {
    const categoriesCollection = collection(db, "categories");

    for (const service of data) {
        await addDoc(categoriesCollection, {
            label: service.label,
        });
    }
};

{/* <Button title="Insertar" onPress={insertarDatosDesdeJson} /> */ }