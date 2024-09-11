export const criarDoador = (email: string) => {
  return {
    nome: 'Doador Válido',
    email: email,
    senha: 'do@dor123',
    CPF: '000.788.610-12',
    local: 'Local válido', 
  };
};

export const criarVoluntario = (email: string) => {
  return {
    nome: 'Voluntario Válido',
    email: email,
    senha: 'volunt@rio',
    CNPJ: '12.345.678/0001-91',
    local: 'Local válido', 
    doacoesEntregues: 1,
  };
};

export const criarCampanha = (voluntarioId: any) => {
  return {
    titulo: 'Título',
    descricao: 'Descrição',
    local: 'Local válido', 
    dataFinal: new Date('2030-01-01'),
    id_voluntario: voluntarioId,
  };
};

export const dadosCampanhaValida = () => {
  return {
    titulo: 'Título',
    descricao: 'Descrição',
    local: 'Local válido', 
    dataFinal: new Date('2030-01-01'),
  }
}

export const criarDoacao = (idDoador: any, idCampanha: any) => {
  return {
    foto: false,
    local: 'Local válido', 
    data: new Date('2030-01-01'),
    id_doador: idDoador,
    id_campanha: idCampanha,
    status: 'em andamento'
  }
}

export const dadosDoacaoValida = (idCampanha: any, foto: boolean) => {
  return {
    titulo: 'Nova doação', 
    foto,
    id_campanha: idCampanha,
  }
} 
