import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
// import { db } from "../../../utils/firebase";
import { db } from "../../../utils/firebase";
import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import * as Location from "expo-location";
import { calculateDistance } from "../../../utils/calculateDistance";
import { getCategories } from "../../../data/getCategories";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native-elements";

export default function ServiceScreen() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(25);
  const [auth, setAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [lastVisible, setLastVisible] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const authFirebase = getAuth();
    const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
      setAuth(user);
    });
    return unsubscribe;
  }, []);

  // Verificar si el usuario es admin
  useEffect(() => {
    const verifyIsAdmin = async () => {
      if (auth) {
        const userDocRef = doc(db, "usersInfo", auth.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setIsAdmin(userData.isAdmin || false);
        } else {
          console.log("El documento del usuario no existe.");
        }
      }
    };
    verifyIsAdmin();
  }, [auth]);

  // Obtener ubicación del usuario
  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        setMostrarTodos(true);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    getUserLocation();
  }, []);

  // Obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const fetchInitialPosts = async () => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"), limit(4));
    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAllPosts(fetchedPosts);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === 4);
  };

  const refreshPosts = async () => {
    setIsRefreshing(true);
    await fetchInitialPosts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  // Refrescar automáticamente al volver a la pantalla
  useFocusEffect(
    useCallback(() => {
      refreshPosts();
    }, [])
  );

  const fetchMorePosts = async () => {
    if (!hasMore || loadingMore || !lastVisible) return;

    setLoadingMore(true);
    const q = query(
      collection(db, "services"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(4)
    );

    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAllPosts((prev) => [...prev, ...fetchedPosts]);
    if (!snapshot.empty) {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }

    setLoadingMore(false);
    if (snapshot.docs.length < 4) {
      setHasMore(false);
    }
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = allPosts;

    if (filteredCategories.length > 0) {
      filtered = filtered.filter((post) => filteredCategories.includes(post.category));
    }

    if (!mostrarTodos && userLocation) {
      filtered = filtered.filter((post) => {
        if (!post.location) return false;
        const distance = calculateDistance(userLocation, post.location);
        return distance <= selectedDistance;
      });
    }

    setPosts(filtered);
  }, [allPosts, filteredCategories, userLocation, selectedDistance, mostrarTodos]);

  return (
    <View>
      <FilterFeed
        placeholder={"Filtrar Servicios"}
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
        distance={selectedDistance}
        setDistance={setSelectedDistance}
        mostrarTodos={mostrarTodos}
        setMostrarTodos={setMostrarTodos}
      />

      <FlatList
        data={posts}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <Post post={item} screenName="ServiceScreen" auth={auth} isAdmin={isAdmin} refreshPosts={refreshPosts} />
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} />
        }
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.3}
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
