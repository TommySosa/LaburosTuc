import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../Filter/FilterFeed.styles";
import { Icon, Switch, Text } from "react-native-elements";
import DistanceSlider from "../../Shared/DistanceSlider/DistanceSlider";

export default function FilterFeed({
  placeholder,
  categories,
  filteredCategories,
  setFilteredCategories,
  distance,
  setDistance,
  mostrarTodos,
  setMostrarTodos
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);

  const toggleFilter = (filter) => {
    const updatedFilters = filteredCategories.includes(filter)
      ? filteredCategories.filter((item) => item !== filter)
      : [...filteredCategories, filter];
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
    if (itemsToShow < categories.length) {
      setItemsToShow((prev) => prev + 20);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

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
          {isFilterOpen ? "Cerrar filtros" : placeholder}
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
              onScroll={handleScroll}
              scrollEventThrottle={400}
            >
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
            </ScrollView>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, paddingHorizontal: 10 }}>
            <Text style={{ marginRight: 10 }}>Mostrar todos</Text>
            <Switch
              value={mostrarTodos}
              onValueChange={setMostrarTodos}
              thumbColor={mostrarTodos ? "#0096c7" : "#ccc"}
              trackColor={{ false: "#aaa", true: "#0096c7" }}
            />
          </View>

          <DistanceSlider distance={distance} setDistance={setDistance} disabled={mostrarTodos} />
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
