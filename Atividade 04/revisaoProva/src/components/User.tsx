import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

const colors = { primary: '#FBBF24', primaryDark: '#F59E0B', primaryLight: '#FEF3C7', bg: '#F9FAFB', card: '#FFFFFF', text: '#111827', textSecondary: '#6B7280', border: '#E5E7EB', danger: '#EF4444' };
const theme = { shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: '12px', transition: 'all 0.2s ease-in-out' };
const inputStyle = { padding: '10px 14px', borderRadius: '8px', border: `1px solid ${colors.border}`, fontSize: '14px', color: colors.text, backgroundColor: colors.card, outline: 'none', transition: theme.transition, width: '100%', boxSizing: 'border-box' as const };

export default function UserSection() {
  const { getUsers, addUser, removeUser } = useUsers();
  const [userName, setUserName] = useState('');

  return (
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
  );
}