const dataSource = require('../../database/models');
const dataSourceCurso = dataSource['Curso'];

describe('Testando o modelo Curso', () => {
  const objetoCurso = {
    titulo: 'Curso de testes de API',
    descricao: 'Curso sobre testes de API com Jest',
    data_inicio: '2024-10-01',
    docente_id: 5,
    categoria_id: 5,
  };

  it('Deve instanciar um novo curso', () => {
    const curso = dataSourceCurso.build(objetoCurso);

    expect(curso).toEqual(expect.objectContaining(objetoCurso));
  });

  it.skip('Deve salvar curso no BD', async () => {
    await dataSourceCurso.create(objetoCurso).then((dados) => {
      expect(dados.titulo).toBe('Testes de API');
    });
  });

  it.skip('Deve buscar o registro criado no BD', async () => {
    const curso = await dataSourceCurso.findOne({
      where: {
        titulo: objetoCurso.titulo,
        descricao: objetoCurso.descricao,
      },
    });

    expect(curso).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoCurso,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      })
    );
  });

  it('Deve fazer uma inserção simulada ao BD, sem inserir os dados', async () => {
    const mockCurso = {
      id: 1,
      titulo: 'Curso de testes de API',
      descricao: 'Curso sobre testes de API com Jest',
      data_inicio: '2024-10-01',
      docente_id: 5,
      categoria_id: 5,
      createdAt: '2024-09-29',
      updatedAt: '2024-09-29',
      deletedAt: null,
    };

    jest.spyOn(dataSourceCurso, 'create').mockResolvedValue(mockCurso);

    const novoCurso = await dataSourceCurso.create(objetoCurso);

    //Verifica se o curso foi criado com os dados esperados pelo mock
    expect(novoCurso).toEqual(mockCurso);

    dataSourceCurso.create.mockRestore();
  });

  it('Deve buscar os dados do BD por ID, de maneira simulada', async () => {
    const mockCurso = {
      id: 1,
      titulo: 'Curso de testes de API',
      descricao: 'Curso sobre testes de API com Jest',
      data_inicio: '2024-10-01',
      docente_id: 5,
      categoria_id: 5,
      createdAt: '2024-09-29',
      updatedAt: '2024-09-29',
      deletedAt: null,
    };

    jest.spyOn(dataSourceCurso, 'findByPk').mockResolvedValue(mockCurso);

    const cursoBuscado = await dataSourceCurso.findByPk(1);
    expect(cursoBuscado).toEqual(mockCurso);
    dataSourceCurso.findByPk.mockRestore();
  });
});
