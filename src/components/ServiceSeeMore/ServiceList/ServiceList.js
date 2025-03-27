import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { styles } from "./ServiceList.style";

export function ServiceList({ services }) {
  const [expanded, setExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const textRef = useRef(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    const lineHeight = 26;
    const maxLines = 2;

    if (height > lineHeight * maxLines) {
      setShouldShowMore(true);
    }
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
            onLayout={handleTextLayout}
            ref={textRef}
          >
            {services?.join(", ") + "."}
          </Text>

          {shouldShowMore && (
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.toggleText}>
                {expanded ? "Menos" : "Más"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
