import React from "react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { UserGuestScreen } from "../Account/UserGuestScreen/UserGuestScreen"
import { LoadingModal } from "../../components";
import JobScreen from "./Job/JobScreen";

export function FeedScreen() {
    const [hasLogged, setHasLogged] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
            setUserId(user ? user.uid : null)
        })
    }, [])

    if (hasLogged === null) {
        return <LoadingModal show text="Cargando" />
    }

    return hasLogged ? <JobScreen /> : <UserGuestScreen />
}