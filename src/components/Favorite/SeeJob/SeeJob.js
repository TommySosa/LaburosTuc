import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Slider from "../Silder/Silder";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../utils";

export default function SeeJob({ idsFav }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    if (!idsFav || idsFav.length === 0) {
      setPosts([]);
      return;
    }

    const favoriteIds = idsFav.map((fav) => fav.id);
    const q = query(collection(db, "jobs"), where("id", "in", favoriteIds));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [idsFav]);

  useEffect(() => {
    if (posts.length === 0) {
      setUsers([]);
      return
    }

    const idUser = [...new Set(posts.map((post) => post.idUser))]; // Eliminamos duplicados

    if (idUser.length === 0) return;

    // Si hay más de 10 usuarios, dividir en grupos de 10
    const userQueries = [];
    for (let i = 0; i < idUser.length; i += 10) {
      const chunk = idUser.slice(i, i + 10);
      const q = query(
        collection(db, "usersInfo"),
        where("idUser", "in", chunk)
      );
      userQueries.push(q);
    }

    const unsubscribes = userQueries.map((q) =>
      onSnapshot(q, (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      })
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [posts]);

  useEffect(() => {
    if (posts.length === 0 || users.length === 0) {
      setMergedData([]);
      return
    }
    // Relacionamos publicaciones con usuarios
    const combinedData = posts.map((post) => ({
      ...post,
      user: users.find((user) => user.id === post.idUser) || null,
    }));

    setMergedData(combinedData);
  }, [posts, users]);

  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#444",
          marginLeft: 5,
        }}
      >
        Trabajos
      </Text>
      {mergedData.length > 0 ? (
        <Slider screenName={"JobScreen"} post={mergedData} />
      ) : (
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#999",
            marginLeft: 10,
            marginTop: 20,
          }}
        >
          No tienes trabajos favoritos.
        </Text>
      )}
    </View>
  );
}
