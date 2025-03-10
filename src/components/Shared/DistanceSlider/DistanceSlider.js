import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Slider } from "react-native-elements";

export default function DistanceSlider({ distance, setDistance }) {
    const tempDistance = useRef(distance);
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 5 }}>
                Distancia: {distance} km
            </Text>

            <Slider
                value={distance}
                onValueChange={(value) => {
                    tempDistance.current = value;
                }}
                onSlidingStart={() => navigation.setOptions({ swipeEnabled: false })}
                onSlidingComplete={() => {
                    setDistance(tempDistance.current);
                    navigation.setOptions({ swipeEnabled: true });
                }}
                minimumValue={1}
                maximumValue={50}
                step={1}
                thumbTintColor="#0096c7"
                minimumTrackTintColor="#0096c7"
                maximumTrackTintColor="#ddd"
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5, marginTop: -10 }}>
                <Text>1 km</Text>
                <Text>50 km</Text>
            </View>
        </View>
    );
}
