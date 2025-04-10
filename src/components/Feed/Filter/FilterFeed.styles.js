import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  filterDropdown: {
    marginTop: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  filterOptionSelected: {
    backgroundColor: '#0096c7',
  },
  filterOptionText: {
    color: '#666',
    // marginRight: 4,
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  selectedFiltersContainer: {
    marginTop: 12,
  },
  selectedFiltersContent: {
    paddingRight: 16,
  },
  selectedFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7fc',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#cceeff',
  },
  selectedFilterText: {
    color: '#0096c7',
    marginRight: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  distanceInput: {
    width: 40,
    textAlign: 'center',
    color: '#0096c7',
    fontWeight: 'bold',
  },
  distanceText: {
    color: '#666',
    marginLeft: 4,
  },
  loadMoreButton: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#0096c7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    maxHeight: 100, // Altura máxima del scroll
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 8,
  },
  inputFilter: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  sliderContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: -10,
  },


});
