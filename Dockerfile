FROM node:18
WORKDIR /app

COPY backend ./caccoId
COPY frontend ./caccoid-front
COPY start.sh .
RUN chmod +x start.sh

# Instalar dependências
RUN cd backend && npm install
RUN cd frontend && npm install

EXPOSE 8080

CMD ["./start.sh"]
