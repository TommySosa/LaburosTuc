import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Post = ({ title, description, schedule, salary, location, imageUri }) => (
  <Card>
    <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200 }} />
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Button
        icon={
          <MaterialCommunityIcons name="heart" size={30} color="red" />
        }
        type="clear"
        title=""
        onPress={() => console.log(`Me gusta el post: ${title}`)}
      />
      <Button
        icon={
          <MaterialCommunityIcons name="comment" size={30} color="black" />
        }
        type="clear"
        title=""
        onPress={() => console.log(`Comentar en el post: ${title}`)}
      />
      <Button
        icon={
          <MaterialCommunityIcons name="share" size={30} color="green" />
        }
        type="clear"
        title=""
        onPress={() => console.log(`Compartir el post: ${title}`)}
      />
    </View>
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      <Text>{description}</Text>
      <Text>Schedule: {schedule}</Text>
      <Text>Salary: {salary}</Text>
      <Text>Location: {location}</Text>
    </View>
  </Card>
);

const JobScreen = () => {
  const posts = [
    {
      title: "Trabajo 1",
      description: "Descripción del trabajo 1...",
      schedule: "8:00 AM - 5:00 PM",
      salary: "$1000 por semana",
      location: "Ciudad A",
      imageUri:
        "https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/There-are-ways-to-make-your-job-application-stand-out-from-the-crowd-/960x0.jpg?format=jpg&width=960",
    },
    {
      title: "Trabajo 2",
      description: "Descripción del trabajo 2...",
      schedule: "9:00 AM - 6:00 PM",
      salary: "$1200 por semana",
      location: "Ciudad B",
      imageUri:
        "https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/There-are-ways-to-make-your-job-application-stand-out-from-the-crowd-/960x0.jpg?format=jpg&width=960",
    },
    {
      title: "Trabajo 3",
      description: "Descripción del trabajo 3...",
      schedule: "10:00 AM - 7:00 PM",
      salary: "$800 por semana",
      location: "Ciudad C",
      imageUri:
        "https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/There-are-ways-to-make-your-job-application-stand-out-from-the-crowd-/960x0.jpg?format=jpg&width=960",
    },
    {
      title: "Trabajo 4",
      description: "Descripción del trabajo 4...",
      schedule: "8:30 AM - 4:30 PM",
      salary: "$1500 por semana",
      location: "Ciudad D",
      imageUri:
        "https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/There-are-ways-to-make-your-job-application-stand-out-from-the-crowd-/960x0.jpg?format=jpg&width=960",
    },
    // Agrega más objetos de post según sea necesario
  ];

  return (
    <ScrollView>
      <View>
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default JobScreen;
