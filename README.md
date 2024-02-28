# Comando de criação do projeto back-end
npx @aka-demy/create-express-app
Perguntas que o comando faz
Give a name for the app: back-end
Language: Javascript
template engine: None
Package manager: npm

# Instalação do Prisma
npm install prisma --save-dev 
g
# Inicilialização do Prisma
npx prisma init --datasource-provider postgresql

# Execeutar uma migration
npx prisma migrate dev --name create-cars

