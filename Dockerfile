FROM node:latest

WORKDIR /app
COPY package.json /app

RUN npm install -g pnpm && pnpm install --production

COPY . /app
EXPOSE 3001

ENV CERTS_DIR /certs

CMD ["pnpm", "run", "deploy"]