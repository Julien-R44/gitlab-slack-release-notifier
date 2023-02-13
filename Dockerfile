###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:19.4.0-alpine AS development
RUN corepack enable && corepack prepare pnpm@v7.27.0 --activate

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .

RUN pnpm install

USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:19.4.0-alpine AS build
RUN corepack enable && corepack prepare pnpm@v7.27.0 --activate

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --prod

USER node


###################
# PRODUCTION
###################

FROM node:19.4.0-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/index.cjs" ]