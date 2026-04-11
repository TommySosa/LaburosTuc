import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, findNodeHandle, UIManager } from 'react-native';
import { Icon, Overlay, ListItem } from '@rneui/themed';

const PostMenu = ({ editPost, onCloseDeleteModal, handleReportarUsuario, handleReportarPublicacion, mostrarTodasOpciones }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const iconRef = useRef(null);

    const toggleOverlay = () => {
        if (!visible) {
            const handle = findNodeHandle(iconRef.current);
            if (handle) {
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    setPosition({ top: pageY + height, left: pageX });
                    setVisible(true);
                });
            }
        } else {
            setVisible(false);
        }
    };

    return (
        <View>
            <TouchableOpacity ref={iconRef} onPress={toggleOverlay}>
                <Icon
                    name="dots-vertical"
                    type="material-community"
                />
            </TouchableOpacity>

            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                    position: 'absolute',
                    top: position.top,
                    left: position.left - 150,
                    width: 200,
                    padding: 0,
                    elevation: 5,
                    borderRadius: 8,
                }}
            >
                <>
                    {/* Opciones que solo ve el dueño o el admin */}
                    {mostrarTodasOpciones && (
                        <>
                            <ListItem onPress={() => { toggleOverlay(); editPost(); }} containerStyle={{ paddingVertical: 10 }}>
                                <Icon name="pencil-outline" type="material-community" />
                                <ListItem.Content>
                                    <ListItem.Title>Editar</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>

                            <ListItem onPress={() => { toggleOverlay(); onCloseDeleteModal(); }} containerStyle={{ paddingVertical: 10 }}>
                                <Icon name="delete-outline" type="material-community" />
                                <ListItem.Content>
                                    <ListItem.Title>Eliminar</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </>
                    )}

                    {/* Estas se muestran siempre */}
                    <ListItem onPress={() => { toggleOverlay(); handleReportarPublicacion(); }} containerStyle={{ paddingVertical: 10 }}>
                        <Icon name="alert-circle-outline" type="material-community" />
                        <ListItem.Content>
                            <ListItem.Title>Reportar publicación</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>

                    <ListItem onPress={() => { toggleOverlay(); handleReportarUsuario(); }} containerStyle={{ paddingVertical: 10 }}>
                        <Icon name="account-alert-outline" type="material-community" />
                        <ListItem.Content>
                            <ListItem.Title>Reportar usuario</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </>
            </Overlay>
        </View>
    );
};

export default PostMenu;
