import UserSection from './components/User';
import HabitSection from './components/Habit';

const colors = { primary: '#FBBF24', primaryDark: '#F59E0B', bg: '#F9FAFB', text: '#111827', textSecondary: '#6B7280' };

export default function App() {
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
        <p style={{ color: colors.textSecondary, marginTop: '8px' }}>Gestão de usuários e hábitos</p>
      </header>
   
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        <UserSection />
        <HabitSection />

      </div>
    </div>
  );
}