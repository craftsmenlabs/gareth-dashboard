FROM node:onbuild

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

ENV DASHBOARD_CONFIG "docker.js"

EXPOSE 8765

CMD []
ENTRYPOINT ["node", "server.js"]
