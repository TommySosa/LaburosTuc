import React from "react";
import { Text, View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "../Account/UserGuestScreen/UserGuestScreen";
import { LoadingModal } from "../../components";
import { useState, useEffect } from "react";
import JobScreen from "../Feed/Job/JobScreen";
import SeeFavorite from "./FavoritePost/SeeFavorite";

export function FavoriteScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
      setUserId(user ? user.uid : null);
    });
  }, []);

  if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />;
  }

  return hasLogged ? <SeeFavorite /> : <UserGuestScreen />;
}
