FROM node:alpine
WORKDIR "/api-with-prisma"
RUN yarn global add typescript
COPY . .
RUN yarn install
EXPOSE 3001
CMD ["yarn", "dev"]