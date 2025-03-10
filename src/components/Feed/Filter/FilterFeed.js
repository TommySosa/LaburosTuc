import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../Filter/FilterFeed.styles";
import { Icon, Text } from "react-native-elements";
import DistanceSlider from "../../Shared/DistanceSlider/DistanceSlider";

export default function FilterFeed({
  placeholder,
  categories,
  filteredCategories,
  setFilteredCategories,
  distance,
  setDistance,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);

  useEffect(() => {
    setDistance(distance);
  }, [distance]);

  const toggleFilter = (filter) => {
    let updatedFilters;
    if (filteredCategories.includes(filter)) {
      updatedFilters = filteredCategories.filter(item => item !== filter);
    } else {
      updatedFilters = [...filteredCategories, filter];
    }
    setFilteredCategories(updatedFilters);
  };

  const filteredList = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setVisibleCategories(categories.slice(0, itemsToShow));
    } else {

      setVisibleCategories(
        categories.filter((category) =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [categories, searchTerm, itemsToShow]);

  const loadMoreCategories = () => {
    if (searchTerm.trim() === "") {
      setItemsToShow((prev) => prev + 20);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => setIsFilterOpen(!isFilterOpen)}
      >
        <Icon name="search" size={20} color="#0096c7" type="material" />
        <Text style={styles.searchText}>
          {isFilterOpen ? 'Cerrar filtros' : placeholder}
        </Text>
        <Icon
          name={isFilterOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#0096c7"
          type="material-community"
        />
      </TouchableOpacity>

      {isFilterOpen && (
        <View style={styles.filterDropdown}>
          <Text style={styles.filterTitle}>Categorías</Text>

          <TextInput
            style={styles.inputFilter}
            placeholder="Buscar categoría..."
            placeholderTextColor="#aaa"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.listContainer}>
            <FlatList
              data={visibleCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filteredCategories.includes(item) && styles.filterOptionSelected,
                  ]}
                  onPress={() => toggleFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filteredCategories.includes(item) && styles.filterOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {filteredCategories.includes(item) && (
                    <Icon name="check" size={16} color="#fff" type="material" />
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.filterOptions}
              // showsVerticalScrollIndicator={false}
              onEndReached={loadMoreCategories}
              onEndReachedThreshold={0.2}

            />

          </View>
          <DistanceSlider distance={distance} setDistance={setDistance} />

        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.selectedFiltersContainer}
        contentContainerStyle={styles.selectedFiltersContent}
      >
        {filteredCategories.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={styles.selectedFilter}
            onPress={() => toggleFilter(filter)}
          >
            <Text style={styles.selectedFilterText}>{filter}</Text>
            <Icon name="close-circle" size={16} color="#0096c7" type="material-community" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}