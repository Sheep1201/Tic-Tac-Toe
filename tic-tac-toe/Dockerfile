FROM node:18.17.1

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc (dependencies)
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc của container
COPY . .

# Build ứng dụng (cho ứng dụng React)
RUN npm run build

# Công bố cổng container (React thường chạy trên cổng 3000)
EXPOSE 3000

# Lệnh mặc định để chạy khi container khởi động (nếu là ứng dụng Node.js)
CMD ["npm", "start"]