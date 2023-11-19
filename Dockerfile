FROM node:lts-alpine
WORKDIR /usr/src/app
VOLUME /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn install
COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
EXPOSE 3001
CMD ["yarn", "dev"]