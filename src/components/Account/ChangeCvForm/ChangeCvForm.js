import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import * as DocumentPicker from "expo-document-picker";
import { getAuth } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { styles } from './ChangeCvForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeCvForm.data';
import { db } from '../../../utils/firebase';
import {
    doc,
    setDoc,
    where,
    query,
    collection,
    onSnapshot,
} from 'firebase/firestore';
import {
    ref,
    getDownloadURL,
    getStorage,
    uploadBytes,
} from 'firebase/storage';

export function ChangeCvForm({ onClose, onReload, isBeforeRegister, setCvUrl }) {
    const [userInfo, setUserInfo] = useState({});
    const currentUser = getAuth().currentUser;
    const [pickedFile, setPickedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickFile = async () => {
        try {
            const filePickResponse = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            if (filePickResponse != null) {
                setPickedFile({
                    name: filePickResponse.assets[0].name,
                    type: filePickResponse.assets[0].mimeType,
                    uri: filePickResponse.assets[0].uri,
                });
                formik.setFieldValue("cv", filePickResponse.assets[0].uri)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const q = query(collection(db, 'usersInfo'), where('idUser', '==', currentUser.uid));
        onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                setUserInfo(snapshot.docs[0].data());
            }
        });
    }, []);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async () => {
            setIsLoading(true);

            if (!pickedFile) {
                formik.setFieldError('cv', 'Selecciona un archivo antes de cambiar el curriculum');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(pickedFile.uri);
                const blob = await response.blob();
                const storage = getStorage();

                const cvRef = ref(storage, `cvs/${currentUser.uid}`);

                uploadBytes(cvRef, blob).then((snapshot) => {
                    updateUserInfoWithCv(snapshot.metadata.fullPath);
                    setIsLoading(false);
                });
            } catch (error) {
                console.error('Error al subir el curriculum:', error);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al subir el curriculum',
                });
                setIsLoading(false);
            }
        },
    });

    const updateUserInfoWithCv = async (cvPath) => {
        const storage = getStorage()
        const cvRef = ref(storage, cvPath)

        const cvUrl = await getDownloadURL(cvRef)
        const newData = {
            ...userInfo,
            cv: cvUrl,
        };

        formik.setFieldValue("cv", cvUrl)
        newData.idUser = currentUser.uid;

        const myDb = doc(db, 'usersInfo', newData.idUser);

        await setDoc(myDb, newData);

        if (!isBeforeRegister) {
            setCvUrl(cvUrl)
        }

        if (isBeforeRegister) {
            onReload();
            onClose();
        }
    }

    return (
        <View style={styles.content}>
            <Text>Sólo se admite en formato .PDF</Text>
            <Button
                title="Seleccionar documento"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={pickFile}
            />
            {formik.errors.cv && (
                <Text style={{ color: 'red', marginBottom: 10 }}>{formik.errors.cv}</Text>
            )}
            <Button
                title="Guardar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={isLoading}
            />
        </View>
    );
}
