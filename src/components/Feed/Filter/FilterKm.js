import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { db } from "../../../utils";
import { Dropdown } from "react-native-element-dropdown";
import { dataKm } from "../../../utils/ArrayKm";
import { styles } from "../Filter/FilterKm.Style.js";
import { Icon } from "@rneui/themed";

const FilterKm = () => {
  const [km, setKm] = useState();
  return (
    <View style={styles.conteiner}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={dataKm}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="150 kilómetros"
        value={km}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

export default FilterKm;
