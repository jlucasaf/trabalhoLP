export const criarDoador = (email: string) => {
  return {
    nome: 'Doador Válido',
    email: email,
    senha: 'do@dor123',
    CPF: '000.788.610-12',
    local: {
      cidade: 'Cidade Válida',
      endereco: 'Endereço válido',
      CEP: '29046-095',
    },
  };
};

export const criarVoluntario = (email: string) => {
  return {
    nome: 'Voluntario Válido',
    email: email,
    senha: 'volunt@rio',
    CNPJ: '12.345.678/0001-91',
    local: {
      cidade: 'Cidade Válida',
      endereco: 'Endereço Válido',
      CEP: '29046-095',
    },
    doacoesEntregues: 1,
  };
};

export const criarCampanha = (voluntarioId: any) => {
  return {
    titulo: 'Título',
    descricao: 'Descrição',
    local: {
      cidade: 'Cidade',
      endereco: 'Endereço',
      CEP: '29046-095',
    },
    dataFinal: new Date('2030-01-01'),
    id_voluntario: voluntarioId,
  };
};

export const dadosCampanhaValida = () => {
  return {
    titulo: 'Título',
    descricao: 'Descrição',
    local: {
      cidade: 'Cidade',
      endereco: 'Endereço',
      CEP: '29046-095',
    },
    dataFinal: new Date('2030-01-01'),
  }
}

export const criarDoacao = (idDoador: any, idCampanha: any) => {
  return {
    foto: false,
    local: {
        cidade: 'Cidade',
        endereco: 'Endereço',
        CEP: '29046-095',
    },
    data: new Date('2030-01-01'),
    id_doador: idDoador,
    id_campanha: idCampanha,
    status: 'em andamento'
  }
}
