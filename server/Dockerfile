FROM node as base
WORKDIR /usr/src/app
COPY package.*json ./
RUN npm install
COPY . .

FROM base AS development
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
EXPOSE 3000
CMD ["npm", "start"]
