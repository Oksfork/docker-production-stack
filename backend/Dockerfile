FROM node:22-alpine AS base
COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
ENV PATH="/opt/pnpm:${PATH}"
RUN apk add --no-cache libc6-compat

FROM base AS dependencies
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS runner
WORKDIR /app
COPY --from=dependencies /app/package.json ./package.json
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN touch .env
ENV PORT=8001
ENV HOST=0.0.0.0
EXPOSE 8001
CMD ["node", "server.js"]