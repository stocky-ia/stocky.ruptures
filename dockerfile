# Imagem base oficial do Node.js
FROM node:16-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie todo o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Compile o projeto
RUN npm run build

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Defina a variável de ambiente para a produção
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://denis:010203@stocky-rupturas.vytqmpc.mongodb.net/ruptures?retryWrites=true&w=majority

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]