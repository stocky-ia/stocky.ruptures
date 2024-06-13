# Services: stock.rupturas

Este projeto é uma aplicação desenvolvida utilizando o framework [NestJS](https://nestjs.com/), com [TypeORM](https://typeorm.io/) para gerenciamento do banco de dados MongoDB. A arquitetura do projeto segue os princípios da Clean Architecture, garantindo uma separação clara entre as camadas de domínio, aplicação e infraestrutura.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis e eficientes.
- **TypeORM**: ORM para gerenciar as interações com o banco de dados MongoDB.
- **GraphQL**: Para construção de APIs eficientes e flexíveis.
- **Swagger**: Para documentação e teste das APIs REST.

## Estrutura do Projeto

O projeto está organizado de acordo com os princípios da Clean Architecture:

- **Commons**: Contém entidades e utilitários que são compartilhados entre diferentes partes da aplicação.
- **Core**: Inclui as entidades de domínio, use cases, dtos (Data Transfer Objects) e enums.
- **Infrastructure**: Implementa os detalhes específicos da infraestrutura, como controladores, serviços, repositórios e configuração do banco de dados.

## Endpoints Disponíveis

### Swagger

A documentação das APIs REST está disponível no Swagger. Para acessá-la, inicie a aplicação e navegue até:

```
http://localhost:3000/api
```

### GraphQL

A interface do GraphQL Playground pode ser acessada para testar e explorar as APIs GraphQL disponíveis. Navegue até:

```
http://localhost:3000/graphql
```

#### Exemplo de Query

Aqui está um exemplo de query que pode ser usada para testar a API GraphQL:

```graphql
query {
  queryImports(query: { status: WAITING, page: 1, limit: 10 }) {
    id
    status
    type
    filename
    filesize
    fileExtension
    createdAt
    updatedAt
  }
}
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior) ou yarn

### Passos para Rodar a Aplicação

1. Clone o repositório:

```bash
git clone https://github.com/stocky-ia/stocky.ruptures.git
```

2. Navegue até o diretório do projeto:

```bash
cd seu-repositorio
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
MONGODB_URI=mongodb://localhost/nest
```

5. Inicie a aplicação:

```bash
npm run start
```

### Rodando os Testes

Para rodar os testes, utilize o comando:

```bash
npm run test
```
