# 🧠 NestJS Headless API — JWT Auth & Roles

API REST construída com **NestJS**, **TypeORM** e **JWT Authentication**, com sistema completo de **usuários, permissões e artigos**.

O projeto está preparado para rodar em **Docker**, com banco de dados PostgreSQL e autenticação baseada em **token JWT**.

---

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport JWT](https://docs.nestjs.com/security/authentication)
- [Docker](https://www.docker.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## ⚙️ Funcionalidades

✅ Cadastro, login e autenticação de usuários  
✅ Controle de permissões por função (Admin, Editor, Reader)  
✅ Criação, listagem, atualização e exclusão de artigos  
✅ Proteção de rotas com Guards (`JwtAuthGuard` e `RolesGuard`)  
✅ Estrutura modular (Users, Auth, Articles)  
✅ Configuração via variáveis de ambiente  
✅ Totalmente compatível com Docker e TypeORM Migrations

---

## 🧩 Estrutura de Pastas

src/
├── auth/ # Módulo de autenticação (JWT, Guards, Decorators)
├── users/ # Usuários e permissões
├── articles/ # CRUD de artigos
├── app.module.ts # Módulo raiz
├── main.ts # Bootstrap da aplicação


---

## 🐳 Rodando com Docker

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/natanielmartinsoliveira/artigosNestjs.git
cd artigosNestjs

```

## Crie um arquivo .env na raiz:

POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nestjs_articles

JWT_SECRET=my_super_secret
JWT_EXPIRATION_TIME=86400

3️⃣ Suba os containers

docker-compose up --build


A API estará disponível em:
👉 http://localhost:3000


# Endpoints Principais

## 🔐 Autenticação

| Método | Rota             | Descrição            |
| ------ | ---------------- | -------------------- |
| `POST` | `/auth/register` | Cria um novo usuário |
| `POST` | `/auth/login`    | Retorna um token JWT |

```bash
POST /auth/login
{
  "email": "admin@example.com",
  "password": "123456"
}
```

```bash
{
  "access_token": "jwt_token_aqui"
}
```

# 👤 Usuários

| Método   | Rota         | Permissão | Descrição               |
| -------- | ------------ | --------- | ----------------------- |
| `GET`    | `/users`     | Admin     | Lista todos os usuários |
| `POST`   | `/users`     | Público   | Cria um usuário         |
| `PATCH`  | `/users/:id` | Admin     | Atualiza usuário        |
| `DELETE` | `/users/:id` | Admin     | Remove usuário          |

# 📝 Artigos

| Método   | Rota            | Permissão      | Descrição       |
| -------- | --------------- | -------------- | --------------- |
| `GET`    | `/articles`     | Todos          | Lista artigos   |
| `POST`   | `/articles`     | Admin / Editor | Cria artigo     |
| `PATCH`  | `/articles/:id` | Admin / Editor | Atualiza artigo |
| `DELETE` | `/articles/:id` | Admin          | Remove artigo   |

```bash
POST /articles
Authorization: Bearer <token>

{
  "title": "Meu primeiro artigo",
  "content": "Conteúdo do artigo"
}
```

# 🔑 Papéis e Permissões

| Role       | Acesso               |
| ---------- | -------------------- |
| **Admin**  | Total                |
| **Editor** | Criar / Editar / Ler |
| **Reader** | Somente leitura      |


🧰 Comandos úteis


| Comando                      | Descrição                                 |
| ---------------------------- | ----------------------------------------- |
| `npm run start:dev`          | Inicia o servidor em modo desenvolvimento |
| `npm run build`              | Compila o projeto                         |
| `npm run migration:generate` | Gera uma nova migration                   |
| `npm run migration:run`      | Executa migrations                        |
| `docker-compose up --build`  | Roda tudo via Docker                      |

🧑‍💻 Autor

Nataniel Oliveira ✨


🪶 Licença

Este projeto está sob a licença MIT — sinta-se livre para usar e modificar.


---

Quer que eu **adicione os comandos de migration** e configuração do `docker-compose.yml` (para incluir o Postgres + NestJS já rodando juntos) no final do README também?  
Posso deixar o arquivo completo com seções “🧱 Setup do Banco” e “🔄 Migrations automáticas”.
