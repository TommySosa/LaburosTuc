import React from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, Linking } from 'react-native';
import Pdf from 'react-native-pdf';
import { styles } from './PdfRead.styles';

export function PdfRead({ isVisible, onClose, cv, fileName }) {
    const PdfResource = {
        uri: cv,
        cache: true,
    };

    const onDownload = async () => {
        try {
            Linking.openURL(cv)
        } catch (error) {
            Alert.alert('Error', 'No se pudo descargar el archivo.');
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
                        <Text style={styles.downloadButtonText}>Descargar</Text>
                    </TouchableOpacity>
                    {
                        cv ? <Pdf
                            trustAllCerts={false}
                            source={PdfResource}
                            style={styles.pdf}
                        /> : <View style={styles.inputContainer}>
                            <Text style={styles.input}>Aún no cargó un curriculum</Text>
                        </View>
                    }

                </View>
            </View>
        </Modal>
    );
}

