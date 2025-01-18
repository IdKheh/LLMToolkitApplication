FROM node:latest

WORKDIR /app/frontend/

COPY package*.json ./
RUN npm install axios@1.7.5
RUN npm install react-scripts --save
RUN npm install react-chartjs-2 chart.js
RUN npm install

COPY . .

ENV PORT=80
EXPOSE 80

CMD ["npm", "start"]
