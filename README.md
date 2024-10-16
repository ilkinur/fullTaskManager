**Personal Task Manager**

**Front-End – Vue CLI**

\-          Vue.js, Vuex, VueRouter, VueMeta, vee-validate, vue-toast-notification, Bootstrap, Chart.js, axios, moment ( **elsint** use all time with vue cli on devDependencies)

**Back-End – PHP (Laravel), Restfull APIs with JWT Authentication**

\-          Laravel, DB – PostgreSQL (with user and task table relation)

Added client-side and server-side validation.

Errors handle by Laravel framework special libraries and show by vue-toast-notification to user

**API Endpoints**

\-          POST    /api/register - Register a new user.

\-          POST     /api/login - Login and receive a JWT.

\-          GET      /api/task - Get all tasks for the logged-in user.

\-          GET      /api/profile – Get logged-in user data and task analytic data.

\-          GET      /api/refresh – Generate new refresh token for logged-in user.

\-          GET      /api/logout – Remove jwt token for logged-in user.

\-          POST    /api/task - Create a new task.

\-          POST    /api/taskDelete – Delete a task.

\-          POST    /api/taskUpdate – Update a task.

I added all APIs with body params to Postman collection (see project “TaskManager.postman\_collection.json” file)

**Installation**

Firstly, install docker and docker-composer to your PC.

Then clone project from repository

·         git clone [https://github.com/ilkinur/fullTaskManager.git](https://github.com/ilkinur/fullTaskManager.git)

·         cd fullTaskManager

Then up all containers with docker.

·         docker-compose up -d

\* Project use 4 container.

1.laravel\_app – for Laravel project

2\. postgres – for PostgreSQL

3\. vue\_app – for build Vue project

4\. nginx – for forwarding ports and control apps over browser

Then write on terminal

·         cp TaskManagerBack/.env.example TaskManagerBack/.env

If all containers upped successfully then write on terminal

·         docker exec laravel\_app composer install

for download Laravel dependencies to Laravel\_app container

Then write on terminal

·         docker exec laravel\_app php artisan migrate

for migrate all PostgreSQL tables to postgres database over postgres container.

And ready.

Api – [http://localhost:8000](http://localhost:8000/)

Vue CLI – [http://localhost:8080](http://localhost:8080/)
