import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import HabitsApp from './components/HabitsApp';
import { CssBaseline } from '@mui/material';

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <HabitsApp />
    </Provider>
  );
}