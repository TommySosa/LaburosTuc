import { Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../utils"
import { Info } from '../../../components/JobSeeMore/Info/Info';
import { Header } from '../../../components/JobSeeMore/Header/Header';
import { Carousel } from '../../../components/Shared/Carousel/Carousel';
import { BtnFavoriteJob } from '../../../components/Shared/BtnFavorite/BtnFavoriteJob';

const { width } = Dimensions.get("window")

export function JobSeeMoreScreen({ route }) {
    const { id } = route.params;
    const [job, setJob] = useState(null)

    useEffect(() => {
        const fetchJob = async () => {
            const docRef = doc(db, "jobs", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setJob(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }

        fetchJob();
    }, [id]);

    return (
        <ScrollView>
            {job && (
                <>
                    <Carousel images={job.images} height={250} width={width} />
                    <Header job={job} />
                    <Info job={job} isJob={true} />
                    <BtnFavoriteJob id={job.id} />
                </>
            )}
        </ScrollView>
    )
}