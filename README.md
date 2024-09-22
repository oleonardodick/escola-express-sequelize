# API de Cursos com Sequelize e Express

# Como criar o banco para esse projeto

- Na raiz do projeto, criar o arquivo database.sqlite
- Após isso, rodar o comando responsável por rodar as migrações e criar as tabelas no banco de dados:

```bash
npx sequelize-cli db:migrate".
```

- Opcional: Rodar o comando responsável por executar os seeders e preencher alguns dados nas tabelas:

```bash
npx sequelize-cli db:seed:all
```
