# Can check image with version 'buster' to see if the network will be resolved to host or if the npm install(the container) will run with the correct network.
FROM node:18.20.2-bullseye-slim AS base
ENV APP=/app
# Install dumb-init to use a tool that will act like an init process, in that it is invoked with PID 1,
# then spawns our Node.js application as another process whilst ensuring that all signals are proxied to that Node.js process
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get -y --no-install-recommends install \
    curl \
    git \
    build-essential \
    libpq-dev \
    postgresql-client \
    software-properties-common \
    nginx

# Set NODE_ENV variable for optimizations on production
WORKDIR $APP
COPY --chown=node:node package*.json $APP/
COPY --chown=node:node tsconfig.json $APP/
EXPOSE 5050

# FROM base AS production
# ENV NODE_ENV production
# Not needed per task requirements

# For more security information related to docker, visit:
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

FROM base AS development

ENV NODE_ENV development

RUN npm install -g nodemon && npm install

COPY prisma/schema.prisma $APP/prisma/
RUN npx prisma generate

COPY . $APP

CMD ["npx" "nodemon" "server.ts"]