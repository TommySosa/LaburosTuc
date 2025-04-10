import { ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { Text, Button, Image } from 'react-native-elements'
import { screen } from '../../../utils'
import { styles } from './UserGuestScreen.styles'

export function UserGuestScreen() {
    const navigation = useNavigation()
    const goToLogin = () => {
        navigation.navigate(screen.account.login)
        // navigation.navigate(screen.account.completeUserInfo)
    }

    return (
        <ScrollView centerContent={true}
            style={styles.content}>
            <Image source={require("../../../../assets/img/user-guest.png")}
                style={styles.image} />
            <Text style={styles.title}>Consultar tu perfil</Text>
            <Text style={styles.description}>¿Como te describirías para conseguir trabajo? Buscá y visualizá
                los empleos y servicios disponibles de una forma sencilla, postulate
                y comenta como ha sido tu experiencia.
            </Text>

            <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btnStyle} />
        </ScrollView>
    )
}