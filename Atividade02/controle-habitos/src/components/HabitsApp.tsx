import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHabit,
  editHabit,
  toggleHabitCompletion,
  deleteHabit,
  clearCompletedHabits,
  setFilterCategory,
  selectFilteredHabits,
  selectFilterCategory,
  selectAllHabits,
} from '../store/habitsSlice';

import type {Habit} from '../types';

import {
  Container, Typography, TextField, Button, Box, List, ListItem,
  ListItemText, Checkbox, IconButton, Select, MenuItem, FormControl, InputLabel, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function HabitsApp() {
  const dispatch = useDispatch();
  const filteredHabits = useSelector(selectFilteredHabits);
  const filterCategory = useSelector(selectFilterCategory);
  const allHabits = useSelector(selectAllHabits);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ['Todas', ...Array.from(new Set(allHabits.map(h => h.category)))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return; 

    if (editingId) {
      dispatch(editHabit({ id: editingId, name, category }));
      setEditingId(null);
    } else {
      dispatch(addHabit({ name, category }));
    }
    setName('');
    setCategory('');
  };

  const handleEditInit = (habit: Habit) => {
    setEditingId(habit.id);
    setName(habit.name);
    setCategory(habit.category);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Controle de Hábitos Diários
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Nome do Hábito"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Categoria"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Saúde, Estudo"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" sx={{ height: '40px', minWidth: '120px' }}>
              {editingId ? 'Salvar' : 'Adicionar'}
            </Button>
            {editingId && (
              <Button variant="text" onClick={() => { setEditingId(null); setName(''); setCategory(''); }}>
                Cancelar
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      {/* Controles de Filtro e Limpeza */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl sx={{ minWidth: 200 , height: '40px'}}>
          <InputLabel>Filtrar por Categoria</InputLabel>
          <Select
            value={filterCategory}
            label="Filtrar por Categoria"
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="error" onClick={() => dispatch(clearCompletedHabits())}>
          Limpar Concluídos
        </Button>
      </Box>

      {/* Lista de Hábitos */}
      <Paper>
        <List>
          {filteredHabits.map((habit) => (
            <ListItem
              key={habit.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditInit(habit)} sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteHabit(habit.id))}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                edge="start"
                checked={habit.completed}
                onChange={() => dispatch(toggleHabitCompletion(habit.id))}
              />
              <ListItemText
                primary={habit.name}
                secondary={habit.category}
                sx={{
                  textDecoration: habit.completed ? 'line-through' : 'none',
                  color: habit.completed ? 'text.secondary' : 'text.primary'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}