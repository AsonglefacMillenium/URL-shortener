FROM node:14
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "src/server.js"]
