FROM node:10.15-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g serverless@1.42.3

EXPOSE 8970

CMD serverless offline \
  -s latest \
  -r eu-west-1 \
  --dontPrintOutput \
  --host 0.0.0.0 \
  --port 8970
