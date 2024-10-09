FROM node

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install axios@1.7.5

COPY . /app/frontend/

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]