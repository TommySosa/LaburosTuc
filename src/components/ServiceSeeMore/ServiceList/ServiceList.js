import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { styles } from "./ServiceList.style";

export function ServiceList({ services }) {
  const [expanded, setExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ margin: 0 }}>
      <View style={styles.content}>
        <View
          style={[
            styles.textContainer,
            { maxWidth: Dimensions.get("window").width - 60 },
          ]}
        >
          <Text
            style={styles.service}
            numberOfLines={expanded ? undefined : 2}
            onTextLayout={(event) => {
              if (event.nativeEvent.lines.length > 2) {
                setShouldShowMore(true);
              } else {
                setShouldShowMore(false);
              }
            }}
          >
            {services?.join(", ") + "."}
          </Text>

          {shouldShowMore && (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.toggleText}>
                {expanded ? "Menos" : "Leer más"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}