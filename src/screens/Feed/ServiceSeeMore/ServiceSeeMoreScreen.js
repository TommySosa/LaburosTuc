import { Dimensions, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Info } from "../../../components/ServiceSeeMore/Info/Info";
import { Header } from "../../../components/ServiceSeeMore/Header/Header";
import { Carousel } from "../../../components/Shared/Carousel/Carousel";
import { BtnFavoriteService } from "../../../components/Shared/BtnFavorite/BtnFavoriteService";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export function ServiceSeeMoreScreen({ route }) {
  const { id } = route.params;
  const [service, setService] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchService = async () => {
        const docRef = doc(db, "services", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setService(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };

      fetchService();

      return () => {
        setService(null); // limpia el estado al desenfocar
      };
    }, [id])
  );

  return (
    <ScrollView>
      {service && (
        <>
          <Carousel images={service.images} height={250} width={width} />
          <Header service={service} />
          <Info service={service} isService={true} />
          <BtnFavoriteService id={id} />
          {/* <ServiceList data={service} /> */}
        </>
      )}
    </ScrollView>
  );
}
