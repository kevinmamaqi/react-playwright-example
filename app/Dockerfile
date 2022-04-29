# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat jq
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.node.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM deps as builder
WORKDIR /app
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM nginx:1.21.3-alpine AS runner
# Create nginx dirs
RUN mkdir -p \
    /etc/nginx/templates \
    /etc/nginx/conf.d \
    /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/scgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/run

# Copy conf files
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf.template /etc/nginx/templates/

# Change perms
RUN touch /var/run/nginx.pid
RUN chown nginx:nginx -R /etc/nginx/* /var/cache/nginx/* /var/run/*
