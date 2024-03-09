import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './Info.styles'
import { Text, ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import { Map } from '../../Shared/Map'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../utils'

export function Info({ job }) {
    const [userInfo, setUserInfo] = useState(null)
    useEffect(() => {
        const fetchUserInfo = async () => {
            const docRef = doc(db, "usersInfo", await job.idUser);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserInfo(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }

        if (job) {
            fetchUserInfo();
        }
    }, [job]);

    const listInfo = job && userInfo ? [
        {
            text: job.address != "" ? job.address : "No completó el perfil",
            iconType: "material-community",
            iconName: "map-marker"
        },
        {
            text: userInfo.phone != "" ? job.phone : "No tiene",
            iconType: "material-community",
            iconName: "phone"
        },
        {
            text: userInfo.email,
            iconType: "material-community",
            iconName: "at"
        }
    ] : [];

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Información sobre el</Text>
            {job && <Map location={job.location} name={job.category} />}
            {map(listInfo, (item, index) => (
                <ListItem key={index} bottomDivider>
                    <Icon type={item.iconType} name={item.iconName} color="#00a680" />
                    <ListItem.Content>
                        <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}
