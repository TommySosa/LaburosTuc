import React, { useEffect, useState } from "react";
import { View, Text, RefreshControl, FlatList } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
// import { useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils";
import SeeJob from "../../../components/Favorite/SeeJob/SeeJob";
import SeeService from "../../../components/Favorite/SeeService/SeeService";

export default function SeeFavorite() {
  const [favjob, setFavjob] = useState([]);
  const [favService, setFavService] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const auth = getAuth();
  const idUser = auth.currentUser ? auth.currentUser.uid : null;

  // Traer empleos favoritos
  useEffect(() => {
    if (idUser != null) {
      const q = query(
        collection(db, "favoritesJobs"),
        // orderBy("createdAt", "desc"),
        where("idUser", "==", idUser)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setIsRefreshing(true);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavjob(fetchedPosts);
        setPosts(fetchedPosts);
        setIsRefreshing(false);
      });

      return () => unsubscribe();
    }
  }, [idUser]);
  // Traer sevicios favoritos
  useEffect(() => {
    if (idUser != null) {
      const q = query(
        collection(db, "favoritesServices"),
        where("idUser", "==", idUser)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setIsRefreshing(true);
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavService(fetchedPosts);
        setIsRefreshing(false);
      });

      return () => unsubscribe();
    }
  }, [idUser]);
  return (
    <View>
      {/* <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} screenName="SeeFavorite" />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => {}} />
        }
      /> */}
      <SeeJob idsFav={favjob} />
      <SeeService idsFav={favService} />
    </View>
  );
}
