
   
FROM mcr.microsoft.com/playwright:v1.21.0-focal
USER root
WORKDIR /e2e
COPY package.json package-lock.json .env ./
RUN npm install

CMD [ "npx", "playwright", "test" ]
