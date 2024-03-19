import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import Post from "../../../components/Feed/Posts/Post";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../../utils";

export default function JobScreen() {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPosts = async () => {
    setIsRefreshing(true);
    const q = query(
      collection(db, "jobs"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const newPosts = snapshot.docs.map((doc) => doc.data());
    setPosts(newPosts);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} screenName="JobScreen"/>}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadPosts}
          />
        }
      />
    </View>
  );
};