import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHabit, filterHabits } from '../store/habitSlice';
import { type RootState } from '../store/store';

const colors = { primary: '#FBBF24', primaryDark: '#F59E0B', primaryLight: '#FEF3C7', bg: '#F9FAFB', card: '#FFFFFF', text: '#111827', textSecondary: '#6B7280', border: '#E5E7EB', danger: '#EF4444' };
const theme = { shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '12px', transition: 'all 0.2s ease-in-out' };
const inputStyle = { padding: '10px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', color: colors.text, backgroundColor: colors.card, outline: 'none', transition: theme.transition, width: '100%', boxSizing: 'border-box' as const };

export default function HabitSection() {
  const dispatch = useDispatch();
  const { habits, filter } = useSelector((state: RootState) => state.habits);
  const [habitName, setHabitName] = useState('');
  const [habitCategory, setHabitCategory] = useState('Saúde');

  const filteredHabits = filter === 'Todos' ? habits : habits.filter(h => h.category === filter);

  return (
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
  );
}