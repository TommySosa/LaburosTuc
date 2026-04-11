import { Dimensions, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Info } from "../../../components/JobSeeMore/Info/Info";
import { Header } from "../../../components/JobSeeMore/Header/Header";
import { Carousel } from "../../../components/Shared/Carousel/Carousel";
import { BtnFavoriteJob } from "../../../components/Shared/BtnFavorite/BtnFavoriteJob";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export function JobSeeMoreScreen({ route }) {
  const { id } = route.params;
  const [job, setJob] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchJob = async () => {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      fetchJob();

      return () => {
        setJob(null); // limpia el estado al desenfocar
      };
    }, [id])
  );

  return (
    <ScrollView>
      {job && (
        <>
          <Carousel images={job.images} height={250} width={width} />
          <Header job={job} />
          <Info job={job} isJob={true} />
          <BtnFavoriteJob bg={true} id={id} />
        </>
      )}
    </ScrollView>
  );
}
