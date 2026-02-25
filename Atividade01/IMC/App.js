import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useApp } from './hooks';

export default function App() {

  const {
    peso,
    altura,
    resultado,
    erro,
    setPeso,
    setAltura,
    calcular,
    limpar
  } = useApp();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Calculadora de Índice de Massa Corporal (IMC)
      </Text>

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.label}>Altura (m)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Calcular" onPress={calcular} />
        </View>

        <View style={styles.button}>
          <Button title="Limpar" onPress={limpar} />
        </View>
      </View>

      {resultado && (
        <Text style={[styles.resultado, { color: resultado.cor }]}>
          IMC: {resultado.valor}
          {"\n"}
          {resultado.classificacao}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:20
  },

  label:{
    fontSize:16,
    marginTop:10
  },

  input:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:4,
    padding:8
  },

  buttons:{
    marginTop:20,
    gap:10,
  },

  button:{
    marginTop:10
  },

  resultado:{
    marginTop:20,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  },

  erro:{
    marginTop:20,
    color:'red',
    textAlign:'center'
  }
});