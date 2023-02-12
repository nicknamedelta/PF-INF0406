# GErenciador de Chamados de TI - GECTI

Implementação do backend da aplicação, aqui foram implementados as entidades de Usuário, Empresa, Departamento e Chamado.

## Equipe com seus respectivos membros

-   EVALDO FELIPE LIMA - 201907454
-   IAN MORAES EDUARDO - 201907471
-   LUIZ ANTONIO ROBERTO GROOTERS JUNIOR - 201907483

## Acesso a documentação do Swagger:

No navegador, acesse a url: [localhost:3000/api/](http://localhost:3000/api/)

## :runner: Como rodar este projeto?

-   É necessário popular o arquivo `.env` com os dados exatos do `.env.example`, atualizar o banco e por fim rodar o projeto:
    1.  Para gerar o token JWT, acesse: [jwt.io/](https://jwt.io/)
    2.  Para gerar a Url do Banco de Dados Postgres através do Railway, acesse: [railway.app/](https://railway.app/)
    3.  Para manter o schema do banco sincronizado com o schema Prisma, execute no terminal: `yarn migrate:dev`
    4.  Para rodar o projeto, execute no terminal: `yarn dev`

## Referências

-   [Nest.Js Docs](https://docs.nestjs.com/)
-   [Nest.Js Swagger Open API Guide](https://docs.nestjs.com/openapi/introduction)
-   [RailWay Docs](https://docs.railway.app/)
-   [Deploy Nest.Js on Vercel](https://levelup.gitconnected.com/how-to-deploy-your-nestjs-apps-on-vercel-3431b9f2b4c6)
-   [Deploy Nest.Js on Cloud Run](https://www.tomray.dev/deploy-nestjs-cloud-run)
-   [Prisma Docs](https://www.prisma.io/docs/getting-started)
-   [Prisma PostgreSQL](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#specify-a-postgresql-data-source)
-   [Prisma Error Codes](https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes)

