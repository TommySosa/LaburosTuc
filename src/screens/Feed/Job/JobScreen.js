import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../utils";
import { styles } from "./JobScreen.styles";

import FilterFeed from "../../../components/Feed/Filter/FilterFeed";
import FilterKm from "../../../components/Feed/Filter/FilterKm";

export default function JobScreen({ formik }) {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);

  const loadPosts = async () => {
    setIsRefreshing(true);
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const newPosts = snapshot.docs.map((doc) => doc.data());
    setPosts(newPosts);
    setIsRefreshing(false);
  };
  const loadPostsFiltred = async () => {
    setIsRefreshing(true);
    let combinedPosts = [];
    for (const selectedCategory of categories) {
      const q = query(
        collection(db, "jobs"),
        where("category", "==", selectedCategory)
      );
      const snapshot = await getDocs(q);
      const categoryPosts = snapshot.docs.map((doc) => doc.data());
      combinedPosts = [...combinedPosts, ...categoryPosts];
    }
    setPosts(combinedPosts);
    setIsRefreshing(false);
  };
  useEffect(() => {
    if (categories.length === 0) {
      loadPosts();
    } else {
      loadPostsFiltred();
    }
  }, [categories]);

  console.log("feed: ", categories);
  return (
    <View>
      <View style={styles.filter}>
        <FilterFeed
          placeholder={"Filtrar Empleos"}
          categories={categories}
          setCategories={setCategories}
        />
        <FilterKm />
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadPosts} />
        }
      />
    </View>
  );
}
