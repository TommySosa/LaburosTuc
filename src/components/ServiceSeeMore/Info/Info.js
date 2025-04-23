import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './Info.styles';
import { Text, ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';
import { Map } from '../../Shared/Map';
import { openWhatsApp } from '../../../utils/openWhatsApp';
import { openEmail } from '../../../utils/openEmail';

export function Info({ service }) {
    // const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         const docRef = doc(db, "usersInfo", await service.idUser);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             setUserInfo(docSnap.data());
    //         } else {
    //             console.log("User Info not found");
    //         }
    //     };

    //     if (service) {
    //         fetchUserInfo();
    //     }
    // }, [service]);

    const listInfo = service ? [
        {
            text: service.address ? service.address : "No completó el perfil",
            iconType: "material-community",
            iconName: "map-marker"
        },
        {
            text: service.phone,
            iconType: "material-community",
            iconName: "phone",
            onPress: () => openWhatsApp(service.phone, service.services)
        },
        {
            text: service.email,
            iconType: "material-community",
            iconName: "at",
            onPress: () => openEmail(service.email, service.services)
        }
    ].filter(Boolean) : [];

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Información sobre el servicio</Text>
            {service && <Map location={service.location} name={service.category} />}
            {map(listInfo, (item, index) => (
                item.text && (
                    <ListItem
                        key={index}
                        bottomDivider
                        onPress={item.onPress}
                    >
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
    );
}
