# Stage 1: Build UI
FROM node:18 as build
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve UI and API Routes
FROM node:18
WORKDIR /app
COPY --from=build /app/build ./client/build
COPY server/package*.json ./
RUN npm install --only=production
COPY server/ .
EXPOSE 5000
CMD [ "node", "server.js" ]