
# FROM node:18


# WORKDIR /app


# COPY package*.json ./
# RUN npm install


# COPY . .
# # RUN mkdir -p /app/logs

# RUN npm run build


# EXPOSE 3000


# CMD ["npm", "start"]


FROM node:18-slim AS build

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the files and build
COPY . .
RUN npm run build

# 5. Use a clean image for final run (multistage build)
FROM node:18-slim AS production

WORKDIR /app

# Only copy necessary files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 5000

CMD ["node", "dist/server.js"]