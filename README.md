Этот проект был создан с использованием 
backend: Node.js с Express.js 
frontend: Next.js
database: postgresql и
Docker
И swagger в документации по API

После клонирования репозитория откройте терминал и установите необходимые зависимости

# backend

- cd backend

- npm install 

# frontend

- cd front

- npm install

Теперь вернитесь в корневую папку и создайте проект с помощью docker

- docker compose up --build

Это приведет к созданию образов и контейнеров docker. После этого вы сможете просмотреть выходные данные проекта

# frontend
- localhost:3000


# backend
- localhost:5000/api

# swagger
- localhost:5000/api-docs




