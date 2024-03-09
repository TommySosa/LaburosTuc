import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoadingModal, Modal } from '../../../components';
import { InfoUser } from '../../../components/Account/SeeProfile/InfoUser/InfoUser';
import { PdfRead } from '../../../components/Shared/PdfRead/PdfRead';
import { Button, Icon, ListItem } from 'react-native-elements';
import { Skeleton } from '@rneui/base';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../utils';
import { styles } from './SeeProfile.styles';
import { map } from 'lodash';

export function SeeProfile() {
    const route = useRoute();
    const { idUser } = route.params;
    const [userInfo, setUserInfo] = useState([]);
    const [loadingText, setLoadingText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [textLoading, setTextLoading] = useState(true);

    useEffect(() => {
        if (idUser != null) {
            const q = query(
                collection(db, "usersInfo"),
                where("idUser", "==", idUser)
            );
            onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    setUserInfo(snapshot.docs[0].data());
                    setTextLoading(false);
                }
            });
        }
    }, [idUser]);

    function getMenuOptions() {
        return [
            {
                title: "Sobre mí",
                iconType: "material-community",
                iconNameLeft: "account-circle",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                text: userInfo.description,
            },
            {
                title: "Educación",
                iconType: "material-community",
                iconNameLeft: "school",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                text: userInfo.education,
            },
            {
                title: "Disponibilidad",
                iconType: "material-community",
                iconNameLeft: "timer-sand",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                text: userInfo.availability,
            },
            {
                title: "Teléfono",
                iconType: "material-community",
                iconNameLeft: "phone",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                text: userInfo.phone,
            },
            {
                title: "Email",
                iconType: "material-community",
                iconNameLeft: "gmail",
                iconColorLeft: "#ccc",
                iconNameRight: "chevron-right",
                iconColorRight: "#ccc",
                text: userInfo.email,
            }
        ];
    }

    const menuOptions = getMenuOptions();

    return (
        <ScrollView>
            <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} userInfo={userInfo} />

            <PdfRead
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                cv={userInfo.cv}
                fileName={userInfo.displayName}
            />

            <View style={styles.content}>
                <Button
                    title="Ver curriculum"
                    buttonStyle={styles.btnCv}
                    titleStyle={styles.btnTextCv}
                    icon={
                        <Icon
                            type="material-community"
                            name="file-document-multiple-outline"
                            color="#fff"
                        />
                    }
                    onPress={() => setModalVisible((prev) => !prev)}
                />
            </View>

            {map(menuOptions, (menu, index) => (
                <ListItem key={index} bottomDivider>
                    <Icon
                        type={menu.iconType}
                        name={menu.iconNameLeft}
                        color={menu.iconColorLeft}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>{menu.title}</ListItem.Title>
                        {textLoading ? (
                            <Skeleton
                                height={20}
                                skeletonStyle={{ backgroundColor: "#ccc" }}
                            />
                        ) : (
                            <Text>
                                {menu.text ? (
                                    menu.text
                                ) : (
                                    <Text style={styles.inputMessage}>
                                        No hay nada para ver aquí
                                    </Text>
                                )}
                            </Text>
                        )}
                    </ListItem.Content>
                </ListItem>
            ))}

            <LoadingModal show={loading} text={loadingText} />
        </ScrollView>
    )
}