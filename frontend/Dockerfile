#STAGE 0: BASE
FROM node:22-alpine AS base
COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
ENV PATH="/opt/pnpm:${PATH}"
RUN apk add --no-cache libc6-compat


#STAGE 1: Install dependencies
FROM base AS dependencies

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

#STAGE 2: BUILD APP
FROM base AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production
RUN pnpm run build

#STAGE 3: RUN APP
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node

EXPOSE 3000
 
CMD ["node", "server.js"]