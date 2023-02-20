
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

Para executar o backend você deve ter o arquivo `.env` criado dentro da pasta `backend/`. O `.env` deve conter as seguintes váriaveis:

`MAIL` (Exemplo de valor: no-reply.creators@outlook.com) </br>
`KEY_MAIL` (Exemplo de valor: senhadoemail123) </br>
`MAIL_PORT` (Exemplo de valor: 587) </br>
`MAIL_HOST` (Exemplo de valor: smtp-mail.outlook.com) </br>
`PAYPAL_CLIENT_ID` </br>
`PAYPAL_SECRET_ID` </br>

Algumas configurações importantes podem ser feitas nos seguintes arquivos:

- `/backend/src/config/auth.ts` 
- `/backend/src/config/paypal.ts`

Após isso, basta abrir o arquivo `Start Backend.bat`. 

### Frontend

Antes de executar o frontend, você deve definir o ip e porta do seu backend. Para fazer isso acesse o arquivo `/frontend/next.config.js`. Feito isso, basta abrir o arquivo `Start Frontend.bat`.

### Database

Para subir o banco de dados no Docker, abra a pasta raiz do projeto no cmd e execute o seguinte comando `docker compose up`.

Para executar as migrations, abra a pasta `/backend/` no cmd e execute o seguinte comando `yarn typeorm migration:run`.

### Ngrok

Para receber as chamadas da webhook do Paypal, você precisa executar o ngrok. Após baixar e fazer login com sua conta, execute o arquivo `Start Ngrok.bat` , copie a url gerada, abra o painel do desenvolvedor do Paypal e configure-o para enviar todos os eventos para a url copiada. Assim todos os eventos que acontecerem em sua conta paypal, serão enviados para seu backend.
