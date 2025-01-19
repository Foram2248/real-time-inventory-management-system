FROM node:16 AS builder

WORKDIR /app

ARG WEBSOCKET_URL
ENV WEBSOCKET_URL=${WEBSOCKET_URL}

COPY . .

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
