import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../utils";
import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import * as Location from "expo-location";
import { calculateDistance } from "../../../utils/calculateDistance";
import { getCategories } from "../../../data/getCategories";

export default function ServiceScreen() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(25);

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

  // const loadPosts = async () => {
  //   setIsRefreshing(true);
  //   const q = query(
  //     collection(db, "services"),
  //     orderBy("createdAt", "desc")
  //   );
  //   const snapshot = await getDocs(q);
  //   const newPosts = snapshot.docs.map((doc) => doc.data());
  //   setPosts(newPosts);
  //   setIsRefreshing(false);
  // };

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));

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

  // useEffect(() => {
  //   loadPosts();
  // }, []);

  return (
    <View>
      <FilterFeed
        placeholder={"Filtrar Servicios"}
        categories={categories}
        filteredCategories={filteredCategories}
        setFilteredCategories={setFilteredCategories}
        distance={selectedDistance}
        setDistance={setSelectedDistance}
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post post={item} screenName="ServiceScreen" />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => {}} />
        }
      />
    </View>
  );
}
