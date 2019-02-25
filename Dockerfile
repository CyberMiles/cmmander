FROM node:10.15.0

RUN cd / \
    && git clone https://github.com/CyberMiles/cmmander.git \
    && cd cmmander \
    && npm install \
    && npm run build

WORKDIR /cmmander

EXPOSE 3000

ENTRYPOINT node src/app/app.js