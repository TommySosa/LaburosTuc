import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, ListItem, Text } from 'react-native-elements'
import { InfoUser } from "../../../components/Account"
import { styles } from "./UserLoggedScreen.styles"
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from "../../../components"
import { map } from 'lodash'
import { Modal } from '../../../components'
import { ChangeEmailForm } from '../../../components/Account'

export function UserLoggedScreen() {
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [_, setReload] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const onReload = () => setReload((prev) => !prev)
    const onCloseOpenModal = () => setShowModal((prev) => !prev)

    const Logout = async () => {
        const auth = getAuth()
        await signOut(auth)
    }

    const selectedComponent = (key) => {
        if (key === "description") {

        }

        if (key === "education") {
            //setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />)
        }

        if (key === "availability") {
            //setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal} />)
        }

        if (key === "interest") {

        }

        if (key === "phone") {

        }

        if (key === "email") {
            setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />)
        }
        onCloseOpenModal()
    }

    const menuOptions = getMenuOptions(selectedComponent)

    return (
        <ScrollView>
            <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

            <View style={styles.content}>
                <Button title="Ver curriculum"
                    buttonStyle={styles.btnCv}
                    titleStyle={styles.btnTextCv}
                    icon={<Icon type='material-community' name="file-document-multiple-outline" color="#fff" />}
                    onPress={Logout}
                />
            </View>

            {map(menuOptions, (menu, index) => (
                <ListItem key={index}
                    bottomDivider
                >
                    <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                            {menu.title}
                        </ListItem.Title>
                        <Text>{menu.text}</Text>
                    </ListItem.Content>
                    <Icon type={menu.iconType} name={"square-edit-outline"} color={menu.iconColorRight} onPress={menu.onPress} />
                </ListItem>
            ))}

            <Button title="Cerrar sesión"
                buttonStyle={styles.btnStyles}
                titleStyle={styles.btnTextStyle}
                onPress={Logout}
            />

            <LoadingModal show={loading} text={loadingText} />
            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
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
            onPress: () => selectedComponent("description")
        },
        {
            title: "Educación",
            iconType: "material-community",
            iconNameLeft: "school",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Universidad Tecnológica Nacional ",
            onPress: () => selectedComponent("education")
        },
        {
            title: "Disponibilidad",
            iconType: "material-community",
            iconNameLeft: "timer-sand",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Full time",
            onPress: () => selectedComponent("avalaibility")
        },
        {
            title: "Intereses",
            iconType: "material-community",
            iconNameLeft: "cards-playing-heart-multiple",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "Desarrollo Full Stack, C# .NET, React, Node,etc",
            onPress: () => selectedComponent("interest")
        },
        {
            title: "Teléfono",
            iconType: "material-community",
            iconNameLeft: "phone",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "3813284273",
            onPress: () => selectedComponent("phone")
        },
        {
            title: "Email",
            iconType: "material-community",
            iconNameLeft: "gmail",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "tomas.facundo.sosa@gmail.com",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            text: "*********",
            onPress: () => selectedComponent("password")
        }
    ]
}