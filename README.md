<img src="./.github/login.png" alt="Tela de login" />

# Gereneciamento de horários 🕑

Este repositório contém uma aplicação para gerenciamento de horários. A aplicação oferece uma série de rotas para interagir com os dados de usuários e agendamentos.

### Rotas 🛣️

Abaixo estão destacadas as principais rotas.

- Users

```bash
# Busca todos os usários
GET /users

# Busca um usuário
GET /users/:id

# Busca todos os usuários do tipo "TEACHER"
GET /users?role="TEACHER"

# Cria um usuário com base no corpo da requisão
POST /users
body {
  "name": "Marcos",
  "email": "marcos@gmail.com",
  "password": "123456",
  "confim_password": "123456",
  "role": "STUDENT", # por padrão
}

# Atualiza um usuário com base no corpo da requisão
UPDATE /users/:id
body {
  "name": "Marcos",
  "email": "marcos@gmail.com",
  "password": "123456",
  "confim_password": "123456",
  "role"(por padrão): "TEACHER",
  "image": "profile.png"
}

# Deleta um usuário
DELETE /users/:id
```

- Schedules

```bash
# Busca todos os agebdamentos
GET /schedules

# Busca um agendamento
GET /schedules/:id

# Busca um agendamento com base no assunto
GET /users?subject="TCC"

# Cria um agendamento com base no corpo da requisão
POST /schedules
body {
  "subject": "Falar sobre Projeto de extensão",
  "description": "Olá professor, espero que esteja bem! Marcando um horário para falarmos sobre o projeto da plataforma de agendamento.",
  "userId": "65c636a1cf2d57831d5367d7",
  "date": "2024/02/29 14:00"
}

# Atualiza um agendamento com base no corpo da requisão
UPDATE /schedules/:id
body {
  "subject": "Falar sobre TCC",
  "description": "Olá professor, espero que esteja bem! Marcando um horário para falarmos sobre o tema do meu TCC",
  "userId": "65c636a1cf2d57831d5367d7",
  "date": "2024/02/29 14:00"
}

# Deleta um agendamento
DELETE /schedules/:id
```

- Session

```bash
# Cria uma sessão
POST /session
body {
  "email": "johndoedev@gmail.com",
  "password": "123456"
}
```

### 📝 Instruções

```bash
# git clone https://github.com/MarcosRene/athena-server.git

# cd athena-server

# yarn || npm install || pnpm install

# yarn dev || npm run dev || pnpm run dev
```

> Nota: Na raiz do projeto, existe um arquivo chamado `.env.example`. Dentro desse arquivo, existem algumas variáveis de ambiente. Copie-as. Em seguida, crie um arquivo `.env` na raiz do projeto e cole as variáveis de ambiente. Após realizar essas etapas, é importante destacar que ainda há uma ação necessária. Você precisará acessar o serviço de nuvem do MongoDB para obter seu nome de usuário e senha de acesso. Essas credenciais serão necessárias para configurar corretamente o acesso ao banco de dados MongoDB em seu ambiente local.

### 🧾 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](https://opensource.org/) para mais informações.
