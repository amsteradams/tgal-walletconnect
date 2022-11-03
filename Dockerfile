# syntax=docker/dockerfile:1
FROM node:16-alpine3.15
WORKDIR /app
COPY . .
#RUN yarn install --production
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000