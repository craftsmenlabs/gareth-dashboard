FROM google/nodejs

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

ENV DASHBOARD_CONFIG "vagrant.js"

EXPOSE 8765

CMD []
ENTRYPOINT ["/nodejs/bin/node", "server.js"]
