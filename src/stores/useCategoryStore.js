import { create } from 'zustand'
import { getCategories } from '../data/getCategories';

export const useCategoryStore = create((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,
    fetchCategories: async () => {
        if (get().categories.length > 0) return; // ✅ Ya se cargaron

        set({ isLoading: true });
        try {
            const data = await getCategories();
            set({ categories: data, isLoading: false });
        } catch (err) {
            console.error('Error al cargar categorías:', err);
            set({ error: err, isLoading: false });
        }
    }
}));
