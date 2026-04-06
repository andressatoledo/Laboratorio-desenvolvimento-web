import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUsers } from './hooks/useUsers';
import { addHabit, filterHabits } from './store/habitSlice';
import { type RootState } from './store/store';

// ==========================================
// DEFINIÇÃO DO SISTEMA DE CORES E ESTILOS
// ==========================================
const colors = {
  primary: '#FBBF24', // Amarelo Principal (Amber 400)
  primaryDark: '#F59E0B', // Amarelo Escuro para Hover (Amber 500)
  primaryLight: '#FEF3C7', // Amarelo Claríssimo (Amber 100)
  bg: '#F9FAFB', // Fundo da tela (Gray 50)
  card: '#FFFFFF', // Fundo dos cards
  text: '#111827', // Texto Principal (Gray 900)
  textSecondary: '#6B7280', // Texto Secundário (Gray 500)
  border: '#E5E7EB', // Bordas sutis (Gray 200)
  danger: '#EF4444', // Vermelho para deletar (Red 500)
};

const theme = {
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  borderRadius: '12px',
  transition: 'all 0.2s ease-in-out',
};

// Estilos reutilizáveis para Inputs e Selects
const inputStyle = {
  padding: '10px 14px',
  borderRadius: '8px',
  border: `1px solid ${colors.border}`,
  fontSize: '14px',
  color: colors.text,
  backgroundColor: colors.card,
  outline: 'none',
  transition: theme.transition,
  width: '100%',
  boxSizing: 'border-box' as const,
};

// ==========================================
// COMPONENTE PRINCIPAL ESTILIZADO
// ==========================================
export default function App() {
  // --- Lógica existente ---
  const { getUsers, addUser, removeUser } = useUsers();
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();
  const { habits, filter } = useSelector((state: RootState) => state.habits);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Saúde');

  const filteredHabits = filter === 'Todos' ? habits : habits.filter(h => h.category === filter);


  return (
    <div style={{
      backgroundColor: colors.bg,
      minHeight: '100vh',
      color: colors.text,
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: '40px 20px',
    }}>
      

      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        borderBottom: `2px solid ${colors.primary}`,
        paddingBottom: '20px'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>
          <span style={{color: colors.primaryDark}}>Habit</span>Flow
        </h1>
        <p style={{ color: colors.textSecondary, marginTop: '8px' }}>Gestão  de usuários e hábitos</p>
      </header>

   
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        <section style={{
          backgroundColor: colors.card,
          padding: '30px',
          borderRadius: theme.borderRadius,
          boxShadow: theme.shadow,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <div style={{width: '12px', height: '24px', backgroundColor: colors.primary, borderRadius: '4px'}}></div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: colors.text }}>Gerenciar Usuários</h2>
          </div>

     
          <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nome do novo usuário..."
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = colors.border}
            />
            <button
              onClick={() => {
                if(userName.trim()){
                  addUser({ id: Date.now().toString(), name: userName });
                  setUserName('');
                }
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: colors.primary,
                color: colors.text,
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: theme.transition,
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Adicionar
            </button>
          </div>

         
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {getUsers.map(u => (
              <li key={u.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px',
                borderBottom: `1px solid ${colors.border}`,
                transition: theme.transition,
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryLight}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontWeight: 500 }}>{u.name}</span>
                <button
                  onClick={() => removeUser(u.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: colors.textSecondary,
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '0 5px',
                    transition: theme.transition,
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = colors.danger}
                  onMouseOut={(e) => e.currentTarget.style.color = colors.textSecondary}
                  title="Remover usuário"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section style={{
          backgroundColor: colors.card,
          padding: '30px',
          borderRadius: theme.borderRadius,
          boxShadow: theme.shadow,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
            <div style={{width: '12px', height: '24px', backgroundColor: colors.primary, borderRadius: '4px'}}></div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: colors.text }}>Gerenciar Hábitos</h2>
          </div>

        
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px', backgroundColor: colors.bg, padding: '15px', borderRadius: '8px', border: `1px solid ${colors.border}` }}>
            <div style={{display: 'flex', gap: '10px'}}>
              <input
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Nome do hábito (ex: Correr)"
                style={{...inputStyle, flex: 2}}
              />
              <select
                value={habitCategory}
                onChange={(e) => setHabitCategory(e.target.value)}
                style={{...inputStyle, flex: 1, textTransform: 'capitalize'}}
              >
                <option value="Saúde">Saúde</option>
                <option value="Estudo">Estudo</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>
            <button
              onClick={() => {
                if(habitName.trim()){
                  dispatch(addHabit({ id: Date.now().toString(), name: habitName, category: habitCategory }));
                  setHabitName('');
                }
              }}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: colors.text, 
                color: colors.card,
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: theme.transition,
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Adicionar
            </button>
          </div>

       
          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Meus hábitos</h3>
              
            
              <select
                onChange={(e) => dispatch(filterHabits(e.target.value))}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: `1px solid ${colors.primary}`,
                  backgroundColor: colors.primaryLight,
                  color: colors.text,
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Saúde">Saúde</option>
                <option value="Estudo">Estudo</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredHabits.map(h => (
                <li key={h.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px',
                  backgroundColor: colors.bg,
                  borderRadius: '8px',
                  marginBottom: '8px',
                  border: `1px solid ${colors.border}`
                }}>
                  <span style={{ fontWeight: 500 }}>{h.name}</span>
                
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    backgroundColor: h.category === 'Saúde' ? '#D1FAE5' : h.category === 'Estudo' ? '#DBEAFE' : '#EDE9FE',
                    color: h.category === 'Saúde' ? '#065F46' : h.category === 'Estudo' ? '#1E40AF' : '#5B21B6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {h.category}
                  </span>
                </li>
              ))}
            </ul>
            {filteredHabits.length === 0 && (
                <p style={{textAlign: 'center', color: colors.textSecondary, fontSize: '14px', marginTop: '30px'}}>Nenhum hábito encontrado.</p>
            )}
          </div>
        </section>
      </div>

      
    </div>
  );
}