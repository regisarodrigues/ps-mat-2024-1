# Comando de criação do projeto back-end
npx @aka-demy/create-express-app

Perguntas que o comando faz:
* Give a name for the app: back-end
* Language: Javascript
* Template engine: None
* Package manager: npm

# Instalação do Prisma
npm install prisma --save-dev

# Inicialização do Prisma
npx prisma init --datasource-provider postgresql

# Executar uma migration
npx prisma migrate dev --name create-cars