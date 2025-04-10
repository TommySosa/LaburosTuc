import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
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
    console.log("Cargando más categorías...");

    if (itemsToShow < categories.length) {
      setItemsToShow((prev) => prev + 20);
    }
  };


  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event;
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isNearBottom) {
      loadMoreCategories();
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
            <ScrollView
              contentContainerStyle={styles.filterOptions}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
              scrollEventThrottle={400}
            >
              <View style={styles.filterOptions}>
                {visibleCategories.map((item) => (
                  <TouchableOpacity
                    key={item}
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
                ))}
              </View>
            </ScrollView>

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