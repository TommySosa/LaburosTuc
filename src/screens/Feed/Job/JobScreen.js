import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../utils";
import * as Location from "expo-location";
import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import { getCategories } from "../../../data/getCategories";
import { calculateDistance } from "../../../utils/calculateDistance";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function JobScreen({ formik }) {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(25);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const authFirebase = getAuth()

    onAuthStateChanged(authFirebase, (user) => {
      // setHasLogged(user ? true : false)
      // setUserId(user ? user.uid : null)
      setAuth(user)
    })
  }, [])

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
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setIsRefreshing(true);
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllPosts(fetchedPosts);
      setPosts(fetchedPosts);
      setIsRefreshing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (filteredCategories.length === 0) {
      setPosts(allPosts);
    } else {
      setPosts(
        allPosts.filter((post) => filteredCategories.includes(post.category))
      );
    }
  }, [filteredCategories, allPosts]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let filteredPosts = allPosts;

    if (filteredCategories.length > 0) {
      filteredPosts = filteredPosts.filter((post) =>
        filteredCategories.includes(post.category)
      );
    }

    if (userLocation) {
      filteredPosts = filteredPosts.filter((post) => {
        if (!post.location) return false;
        const distance = calculateDistance(userLocation, post.location);
        return distance <= selectedDistance;
      });
    }

    setPosts(filteredPosts);
  }, [filteredCategories, allPosts, selectedDistance, userLocation]);

  return (
    <View>
      <FilterFeed
        placeholder={"Filtrar Empleos"}
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
        distance={selectedDistance}
        setDistance={setSelectedDistance}
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} screenName="JobScreen" auth={auth} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => { }} />
        }
      />
    </View>
  );
}
