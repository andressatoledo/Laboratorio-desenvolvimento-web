import { useState } from 'react';
import { identificarClassificacaoIMC } from '../utils/identificarClassificacaoIMC';

export function useApp() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const calcular = () => {
    if (!peso || !altura) {
      setErro('Preencha peso e altura.');
      setResultado('');
      return;
    }

    const pesoNum = parseFloat(peso.replace(',', '.'));

    const alturaFormatada = altura.replace(',', '.');

    const alturaNum = parseFloat(alturaFormatada);

    if (!altura.includes('.') && !altura.includes(',')) {
      setErro('Digite a altura em metros (ex: 1.75)');
      return;
    }

    if (isNaN(alturaNum)) {
      setErro('Digite uma altura válida.');
      return;
    }

    if (alturaNum <= 0) {
      setErro('Altura deve ser maior que zero.');
      return;
    }

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setErro('Digite apenas números válidos.');
      setResultado('');
      return;
    }

    if (alturaNum <= 0) {
      setErro('Altura deve ser maior que zero.');
      setResultado('');
      return;
    }

    const imc = pesoNum / alturaNum ** 2;

    const { classificacao, cor } = identificarClassificacaoIMC(imc);

    setResultado({
      valor: imc.toFixed(2),
      classificacao,
      cor,
    });

    setErro('');
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setErro('');
  };

  return {
    peso,
    altura,
    setPeso,
    setAltura,
    resultado,
    erro,
    calcular,
    limpar,
  };
}
