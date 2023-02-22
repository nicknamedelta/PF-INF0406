# Usando a imagem oficial do Node.js
FROM node:14-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e o yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instalando as dependências
RUN yarn install --frozen-lockfile

# Copiando os arquivos da aplicação
COPY . .

# Buildando a aplicação
RUN yarn build

# Definindo a porta em que a aplicação irá rodar
EXPOSE 3000

# Startando a aplicação
CMD ["yarn", "start"]
