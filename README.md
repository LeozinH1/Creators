# Creators

Projeto desenvolvido para fins de estudo.

## Sobre

Os fãns pagam uma mensalidade para ter acesso ao conteúdo exclusivo públicado pelo seu criador de conteúdo favorito.

## Tecnologias

- Nodejs
- React
- Express
- Docker
- Typeorm
- Typescript
- Styled Components

## Como executar
### Backend

Para executar o backend você deve ter o arquivo '.env' criado dentro da pasta 'backend/'. O '.env' deve conter as seguintes váriaveis:

MAIL (Exemplo de valor: no-reply.creators@outlook.com)
KEY_MAIL (Exemplo de valor: senhadoemail123)
MAIL_PORT (Exemplo de valor: 587)
MAIL_HOST (Exemplo de valor: smtp-mail.outlook.com)
PAYPAL_CLIENT_ID 
PAYPAL_SECRET_ID

Algumas configurações importantes podem ser feitas nos seguintes arquivos:

- /backend/src/config/auth.ts 
- /backend/src/config/paypal.ts

Após isso, basta abrir o arquivo 'Start Backend.bat'. 

### Frontend

### Database

### Ngrok
