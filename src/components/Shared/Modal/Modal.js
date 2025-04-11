import React from 'react'
import { Overlay } from 'react-native-elements'
import { styles } from './Modal.styles'
import { KeyboardAvoidingView, ScrollView } from 'react-native'

export function Modal(props) {
    const { show, close, children } = props
    return (
        <Overlay
            isVisible={show}
            overlayStyle={[styles.overlay, { padding: 0 }]}
            onBackdropPress={close}
        >
            <KeyboardAvoidingView
                behavior={'height'}
                style={{ flexGrow: 1 }}
            >
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </Overlay>

        // <Overlay isVisible={show}
        //     overlayStyle={styles.overlay}
        //     onBackdropPress={close}>
        //     {children}
        // </Overlay> VIEJO COMENTADO 
    )
}