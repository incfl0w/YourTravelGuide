FROM node:14.15-alpine
WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install
RUN npm build
RUN npm install sharp
RUN npm config set proxy null
RUN npm config set https-proxy null
RUN npm config set registry http://registry.npmjs.org/
COPY . ./
EXPOSE 3000