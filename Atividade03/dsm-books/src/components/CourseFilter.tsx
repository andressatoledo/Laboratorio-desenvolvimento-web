import { useBooks } from "../context/BooksContext";
import { MenuItem, Select, Typography, Box, Card, CardContent } from "@mui/material";
import { useState } from "react";

export default function CourseFilter() {
  const { books } = useBooks();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Extrair valores únicos
  const courses = [...new Set(books.map(book => book.course))];
  const semesters = [...new Set(books.map(book => book.semester))].sort((a, b) => a - b);

  // Filtra livros que batem com disciplina e semestre selecionados
  const filteredBooks = books.filter(b => {
    const matchCourse = selectedCourse === "" || b.course === selectedCourse;
    const matchSemester = selectedSemester === "" || b.semester.toString() === selectedSemester;
    return matchCourse && matchSemester;
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Filtrar Livros</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle2">Por Disciplina:</Typography>
          <Select 
            fullWidth 
            value={selectedCourse} 
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Todas as Disciplinas</MenuItem>
            {courses.map(course => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle2">Por Semestre:</Typography>
          <Select 
            fullWidth 
            value={selectedSemester} 
            onChange={e => setSelectedSemester(e.target.value)}
          >
            <MenuItem value="">Todos os Semestres</MenuItem>
            {semesters.map(semester => (
              <MenuItem key={semester} value={semester.toString()}>{semester}º Semestre</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Exibição dos resultados filtrados */}
      {filteredBooks.map((book, idx) => (
        <Card key={idx} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">
              {book.author} | {book.publisher} ({book.year}) <br/>
              <strong>Disciplina:</strong> {book.course} | <strong>Semestre:</strong> {book.semester}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}