import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../../../utils";
import { MultiSelect } from "react-native-element-dropdown";
import { data } from "../../../utils/ArrayServices";
import { styles } from "../Filter/FilterFeed.styles";
import { Icon } from "@rneui/themed";

export default function FilterFeed({
  formik,
  placeholder,
  categories,
  setCategories,
}) {
  // if (categories.length === 0) {
  //   filter = false;
  // } else {
  //   filter = true;
  // }
  // console.log(filter);

  return (
    <View>
      <View style={styles.conteiner}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Buscar..."
          value={categories}
          onChange={(items) => {
            setCategories(items);
            // formik.setFieldValue("services", items);
          }}
          selectedStyle={styles.selectedStyle}
        />

        {/* {formik.errors.category ? (
          <Text style={styles.error}>{formik.errors.category}</Text>
        ) : null} */}
      </View>
    </View>
  );
}
