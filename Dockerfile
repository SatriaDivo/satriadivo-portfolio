# ==========================================
# STAGE 1: Build the Vite React App
# ==========================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Build aplikasi untuk production
# Ini akan membuat folder /app/dist yang isinya HTML/JS/CSS statis
RUN npm run build

# ==========================================
# STAGE 2: Serve dengan Nginx (Lightweight)
# ==========================================
FROM nginx:alpine

# Copy hasil build dari stage 1 ke folder default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi custom Nginx untuk menangani React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 untuk akses web
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]