import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: true,
  error: null,
};

// Async thunks for Firebase CRUD
export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch from Next.js API route
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const categories: Category[] = await response.json();
      return categories;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategory = createAsyncThunk<Category, Omit<Category, 'id'>>(
  'categories/addCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const data = await response.json();
      return { ...category, id: data.id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk<Category, Category>(
  'categories/updateCategory',
  async (category, { rejectWithValue }) => {
    try {
      const { id, ...rest } = category;
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest),
      });
      if (!response.ok) throw new Error('Failed to update category');
      const data = await response.json();
      return { ...data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk<string, string>(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete category');
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const idx = state.categories.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (idx !== -1) state.categories[idx] = action.payload;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.categories = state.categories.filter(
            (cat) => cat.id !== action.payload
          );
        }
      );
  },
});

export default categorySlice.reducer;
