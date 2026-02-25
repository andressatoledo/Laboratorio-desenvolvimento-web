export function identificarClassificacaoIMC(imc) {

  if (imc < 18.5) {
    return {
      classificacao: 'Abaixo do Peso',
      cor: '#FFC067'
    }
  }

  if (imc >= 18.5 && imc <= 24.9) {
    return {
      classificacao: 'Peso Normal (Eutrofia)',
      cor: '#008000'
    }
  }

  if (imc >= 25 && imc <= 29.9) {
    return {
      classificacao: 'Sobrepeso',
      cor: '#BABE23'
    }
  }

  if (imc >= 30 && imc <= 34.9) {
    return {
      classificacao: 'Obesidade Grau I',
      cor: '#FF746C'
    }
  }

  if (imc >= 35 && imc <= 39.9) {
    return {
      classificacao: 'Obesidade Grau II (Severa)',
      cor: '#FF2C2C'
    }
  }

  return {
    classificacao: 'Obesidade Grau III (Mórbida)',
    cor: '#960606'
  }
}