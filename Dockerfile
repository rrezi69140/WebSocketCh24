# Dev image avec hot reload
FROM node:18-alpine
WORKDIR /app

# Copie des fichiers package
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Installation de nodemon globalement (optionnel)
RUN npm install -g nodemon

# Expose le port utilisé par le serveur
EXPOSE 3000

# Lancement du serveur avec hot reload
CMD ["npm", "run", "dev"]
