# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json e package-lock.json
COPY caccoid-front/package*.json ./
RUN npm install

# Copiar todo o código
COPY caccoid-front/. .

# Build do frontend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Instalar serve para servir os arquivos estáticos
RUN npm install -g serve

# Copiar build final
COPY --from=build /app/dist ./dist

# Expor porta padrão do Render
EXPOSE 5173

# Rodar servidor de produção
CMD ["serve", "-s", "dist", "-l", "5173"]
