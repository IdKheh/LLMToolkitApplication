FROM node

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install axios@1.7.5
RUN npm install react-scripts
RUN npm install react-chartjs-2 chart.js

COPY . /app/frontend/

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]