import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, ListItem, Text } from 'react-native-elements'
import { InfoUser, AccountOptions } from "../../../components/Account"
import { styles } from "./UserLoggedScreen.styles"
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from "../../../components"
import { map } from 'lodash'

export function UserLoggedScreen() {
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [_, setReload] = useState(false)

    const onReload = () => setReload((prev) => !prev)

    const Logout = async () => {
        const auth = getAuth()
        await signOut(auth)
    }

    const selectedComponent = (key) => {
        if (key === "displayName") {
            //setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />)
        }

        if (key === "email") {
            //setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />)
        }

        if (key === "password") {
            //setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />)
        }

        onCloseOpenModal()
    }

    const menuOptions = getMenuOptions(selectedComponent)

    return (
        <ScrollView>
            <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

            {map(menuOptions, (menu, index) => (
                <ListItem key={index}
                    bottomDivider
                    onPress={menu.onPress}
                >
                    {/* <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} /> */}
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                            {menu.title}
                        </ListItem.Title>
                        <Text>{menu.text}</Text>
                    </ListItem.Content>
                    {/* <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} /> */}
                </ListItem>
            ))}

            {/* <AccountOptions onReload={onReload} /> */}

            <Button title="Configuración"
                buttonStyle={styles.btnSettings}
                titleStyle={styles.btnSettingsText}
                onPress={() => console.log("Ir a vista configuracion")}
                icon={<Icon type='material-community' name="cog" color="#ccc" />}
            />

            <Button title="Cerrar sesión"
                buttonStyle={styles.btnStyles}
                titleStyle={styles.btnTextStyle}
                onPress={Logout}
            />


            <LoadingModal show={loading} text={loadingText} />
        </ScrollView>
    )
}

function getMenuOptions(selectedComponent) {
    return [
        {
            title: "Sobre mí",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Soy tomi y soy re piola",
            onPress: () => selectedComponent("displayName")
        },
        {
            title: "Educación",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Universidad Tecnológica Nacional ",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Disponibilidad",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Full time",
            onPress: () => selectedComponent("password")
        },
        {
            title: "Intereses",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Desarrollo Full Stack, C# .NET, React, Node,etc",
            onPress: () => selectedComponent("password")
        },
        {
            title: "Teléfono",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "3813284273",
            onPress: () => selectedComponent("password")
        },
        {
            title: "Email",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "tomas.facundo.sosa@gmail.com",
            onPress: () => selectedComponent("password")
        }
    ]
}