FROM node:20.17.0

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 300

CMD ["npm", "run", "dev"]