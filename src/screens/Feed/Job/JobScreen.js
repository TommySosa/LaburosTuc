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
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Text } from "react-native-elements";
import { getCategories } from "../../../data/getCategories";
import * as Location from "expo-location";
import { calculateDistance } from "../../../utils/calculateDistance";

export default function JobScreen({ formik }) {
  const [allPosts, setAllPosts] = useState([]); // para mantener todos los posts cargados
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

  useEffect(() => {
    const authFirebase = getAuth();

    onAuthStateChanged(authFirebase, (user) => {
      setAuth(user);
    });

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

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
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

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(4));
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllPosts(fetchedPosts);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 4);
    };

    fetchInitialPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (!hasMore || loadingMore || !lastVisible) return;

    setLoadingMore(true);

    const q = query(
      collection(db, "jobs"),
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

  // Aplicar filtros cuando cambian allPosts, filtros o la ubicación
  useEffect(() => {
    let filtered = allPosts;

    if (filteredCategories.length > 0) {
      filtered = filtered.filter((post) => filteredCategories.includes(post.category));
    }

    if (userLocation) {
      filtered = filtered.filter((post) => {
        if (!post.location) return false;
        const distance = calculateDistance(userLocation, post.location);
        return distance <= selectedDistance;
      });
    }

    setPosts(filtered);
  }, [allPosts, filteredCategories, userLocation, selectedDistance]);

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
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => { }} />
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
