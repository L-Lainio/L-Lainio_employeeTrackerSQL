# 1. Use a tiny, secure version of Node.js
FROM node:lts-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy only the dependency files first (better caching)
COPY package*.json ./

# 4. Install only what is needed for production
# FIX: Update npm globally to patch the 'glob' and 'tar' vulnerabilities
RUN npm install -g npm@latest && npm ci --omit=dev

# 5. Copy your actual code
COPY . .

# 6. Run as a non-privileged user (Crucial Guard!)
USER node

# 7. Start your app
CMD ["node", "index.js"]
