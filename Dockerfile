FROM node:18-alpine
LABEL authors="Maico Camargo"

WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências do Node.js
RUN npm i --silent

COPY . .

RUN npm run build

# Comando para iniciar o servidor da aplicação Angular
CMD ["npm", "run", "start:prod"]
