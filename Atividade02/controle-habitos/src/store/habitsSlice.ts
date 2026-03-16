import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Habit} from '../types';


interface HabitsState {
  items: Habit[];
  filterCategory: string;
}

const initialState: HabitsState = {
  items: [],
  filterCategory: 'Todas',
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; category: string }>) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload.name,
        category: action.payload.category || 'Sem categoria',
        completed: false,
      });
    },
    editHabit: (state, action: PayloadAction<{ id: string; name: string; category: string }>) => {
      const index = state.items.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.items[index].name = action.payload.name;
        state.items[index].category = action.payload.category;
      }
    },
    toggleHabitCompletion: (state, action: PayloadAction<string>) => {
      const habit = state.items.find(h => h.id === action.payload);
      if (habit) {
        habit.completed = !habit.completed;
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(h => h.id !== action.payload);
    },
    clearCompletedHabits: (state) => {
      state.items = state.items.filter(h => !h.completed);
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
  },
});

export const {
  addHabit,
  editHabit,
  toggleHabitCompletion,
  deleteHabit,
  clearCompletedHabits,
  setFilterCategory,
} = habitsSlice.actions;

// Selectors
export const selectAllHabits = (state: { habits: HabitsState }) => state.habits.items;
export const selectFilterCategory = (state: { habits: HabitsState }) => state.habits.filterCategory;
export const selectFilteredHabits = (state: { habits: HabitsState }) => {
  const habits = state.habits.items;
  const filter = state.habits.filterCategory;
  if (filter === 'Todas') return habits;
  return habits.filter(h => h.category === filter);
};

export default habitsSlice.reducer;