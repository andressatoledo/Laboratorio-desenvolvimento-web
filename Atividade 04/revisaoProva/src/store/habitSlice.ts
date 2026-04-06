import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Habit { id: string; name: string; category: string; }
interface HabitState { habits: Habit[]; filter: string; }

const initialState: HabitState = { habits: [], filter: 'Todos' };

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => { state.habits.push(action.payload); }, 
    removeHabit: (state, action: PayloadAction<string>) => { 
        state.habits = state.habits.filter(h => h.id !== action.payload); 
    },
    filterHabits: (state, action: PayloadAction<string>) => { state.filter = action.payload; } 
  }
});

export const { addHabit, removeHabit, filterHabits } = habitSlice.actions;
export default habitSlice.reducer;