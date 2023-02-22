# Imagem base
FROM node:latest

# Diretório de trabalho
WORKDIR /app

# Instalação de dependências
COPY package*.json ./
RUN yarn
RUN yarn add prisma prisma-client -g
# Copia o restante do código-fonte
COPY . .
RUN npx prisma migrate dev

# Migrações do Prisma
# Build da aplicação
RUN yarn build

EXPOSE 3333
# Comando de inicialização
CMD ["yarn", "start"]
