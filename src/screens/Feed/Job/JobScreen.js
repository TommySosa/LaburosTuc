import React, { useEffect, useState } from "react";
import { View, RefreshControl, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Post from "../../../components/Feed/Posts/Post";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../utils";
import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Text } from "react-native-elements";

export default function JobScreen({ formik }) {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(25);
  const [auth, setAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Estados para la paginación
  const [lastVisible, setLastVisible] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const authFirebase = getAuth();

    onAuthStateChanged(authFirebase, (user) => {
      setAuth(user);
    });
  }, []);

  // Cargar los primeros 4 posts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      const q = query(
        collection(db, "jobs"),
        orderBy("createdAt", "desc"),
        limit(4)
      );

      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(fetchedPosts);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Guardar el último documento
      setHasMore(snapshot.docs.length === 4); // Verificar si hay más datos
    };

    fetchInitialPosts();
  }, []);

  // Cargar más posts al hacer scroll
  const fetchMorePosts = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    const q = query(
      collection(db, "jobs"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible), // Comenzar después del último documento cargado
      limit(4)
    );

    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Actualizar el último documento
    setHasMore(snapshot.docs.length === 4); // Verificar si hay más datos
    setLoadingMore(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterFeed
        placeholder={"Filtrar Empleos"}
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
        distance={selectedDistance}
        setDistance={setSelectedDistance}
      />

      <FlashList
        data={posts}
        renderItem={({ item }) => (
          <Post post={item} screenName="JobScreen" auth={auth} isAdmin={isAdmin} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200} // Tamaño estimado de cada elemento
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => { }} />
        }
        onEndReached={fetchMorePosts} // Llamar a la función para cargar más datos
        onEndReachedThreshold={0.5} // Activar más cerca del final
        ListFooterComponent={
          loadingMore ? (
            <View style={{ padding: 10, alignItems: "center" }}>
              <ActivityIndicator size="small" color="#0000ff" />
              <Text>Cargando más...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}