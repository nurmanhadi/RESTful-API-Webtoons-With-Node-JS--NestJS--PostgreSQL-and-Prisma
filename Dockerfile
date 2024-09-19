# base image
ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine as base

# Mengatur direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Menyalin folder prisma dan melakukan generate Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Menyalin seluruh source code ke dalam container
COPY . .

# Membuild aplikasi
RUN npm run build

# Expose port yang akan digunakan aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["npm", "run", "start:prod"]
