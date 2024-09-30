const app = require('../../app.js');
const request = require('supertest');

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('Get em /cursos', () => {
  it('Deve retornar uma lista de cursos', async () => {
    const resposta = await request(app)
      .get('/cursos')
      .set('Accept', 'application/json')
      .expect('content-type', /json/);

    expect(resposta.status).toBe(200);
  });
});

let idResposta;
describe('Post em /cursos', () => {
  it('Deve adicionar um novo curso', async () => {
    const resposta = await request(app)
      .post('/cursos')
      .send({
        titulo: 'Curso de testes de API',
        descricao: 'Curso sobre testes de API com Jest',
        data_inicio: '2024-10-01',
        docente_id: 5,
        categoria_id: 5,
      })
      .expect(201);
    idResposta = resposta.body.id;
  });

  it('Não deve adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/cursos').send({}).expect(400);
  });
});

describe('Put em /cursos', () => {
  it.each([
    ['titulo', { titulo: 'Curso de testes de API 2' }],
    ['descricao', { descricao: 'Curso sobre testes de API com Jest 2' }],
    ['data_inicio', { data_inicio: '2024-10-02' }],
  ])('Deve atualizar o campo %s', async (chave, param) => {
    await request(app).put(`/cursos/${idResposta}`).send(param).expect(200);
  });
});

describe('Delete em /cursos', () => {
  it('Deve excluir o recurso adicionado', async () => {
    await request(app).delete(`/cursos/${idResposta}`).expect(200);
  });
});
