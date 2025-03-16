# Etapa de construcción
FROM node:20-alpine as build

WORKDIR /app
# Instalar dependencias del sistema (si son necesarias)
RUN apk add --no-cache python3 make g++

# Copiar solo los archivos de package.json primero
COPY package.json package-lock.json* ./

# Instalar dependencias con NODE_ENV=development para asegurarnos de que se instalen todas
RUN npm ci

# Copiar el resto del código
COPY . .

# Ejecutar la construcción
RUN npm run build --verbose

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]