import React from 'react'
import { View } from 'react-native'
import { styles } from './Info.styles'
import { Text, ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import { Map } from '../../Shared/Map'
import { TouchableOpacity } from 'react-native'
import { openWhatsApp } from '../../../utils/openWhatsApp'
import { openEmail } from '../../../utils/openEmail'

export function Info({ job }) {
    // const [userInfo, setUserInfo] = useState(null)
    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         const docRef = doc(db, "usersInfo", await job.idUser);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             setUserInfo(docSnap.data());
    //         } else {
    //             console.log("No such document!");
    //         }
    //     }

    //     if (job) {
    //         fetchUserInfo();
    //     }
    // }, [job]);

    const listInfo = job ? [
        {
            text: job.address != "" ? job.address : "No completó el perfil",
            iconType: "material-community",
            iconName: "map-marker"
        },
        {
            // text: userInfo.phone != "" ? job.phone : "No tiene",
            text: job.phone,
            iconType: "material-community",
            iconName: "phone",
            onPress: () => openWhatsApp(job.phone, job.category)
        },
        {
            // text: userInfo.email,
            text: job.email,
            iconType: "material-community",
            iconName: "at",
            onPress: () => openEmail(job.email, job.category)
        }
    ] : [];

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Información sobre el empleo</Text>
            {job && <Map location={job.location} name={job.category} />}
            {map(listInfo, (item, index) => (
                item.text && (
                    <ListItem key={index} bottomDivider onPress={item.onPress}>
                        <Icon type={item.iconType} name={item.iconName} color="#00a680" />
                        <ListItem.Content>
                            {item.onPress ? (
                                <TouchableOpacity onPress={item.onPress}>
                                    <ListItem.Title>{item.text}</ListItem.Title>
                                </TouchableOpacity>
                            ) : (
                                <ListItem.Title>{item.text}</ListItem.Title>
                            )}
                        </ListItem.Content>
                    </ListItem>
                )
            ))}
        </View>
    )
}
