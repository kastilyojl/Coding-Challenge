Laravel Setup
Laravel new [project_name]
for starter kit: [none] -
[breeze] – session based authentication
[jetstream] – primarily design for session-based authentication
[pest] for testing framework
[mysql] for database [change based on your preference]
[yes] to run default database migration: this will automatically create a database [local server is running].
if not, create a database first (you can only create db manually in laravel),
then update the DB_DATABASE = [db_name]
then, in terminal run php artisan migrate to run database migration

php artisan install:api - this will enabled API route in laravel 11: this will published API route file

Backend

Jason Web Token (JWT) Authentication Setup

    composer require tymon/jwt-auth - this will install package for JWT-based authentication
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
            - willl publish JWT configuration file (jwt.php unser config will be created)
    php artisan jwt:secret - to generate secret key (you can found this at .env file)

    update config\auth.php
        'guards' => [
            'api' => [
                'driver' => 'jwt',
                'provider' => 'users',
            ],
        ]

    in app\Models\User

        use Tymon\JWTAuth\Contracts\JWTSubject;

        class User extends Authenticatable implements JWTSubject {
            public function getJWTIdentifier() {
                return $this->getKey();
            }

            public function getJWTCustomClaims() {
                return [];
            }
        }

    php artisan make:controller [controller_name] - this will create a [controller_name] to handle login, register, and other action made


    App\Controller\UsersController
        use App\Models\User;
        use Illuminate\Support\Facades\Validator;
        use Illuminate\Support\Facades\Hash; - For Password Hashing
        use Tymon\JWTAuth\Facades\JWTAuth; - for JWT Authentication

        Now, create a different function to handle login, register, and home

    routs\api
        define route for each API
        Route::post('/register', [UsersController::class, 'register']);


    (Try it using postman: http://127.0.0.1:8000/api/register?name=MarkEric1&email=sample@gmail.com&password=samplepassword)

React + Vite Setup

    Open then new created laravel project
    Install all the  dependencies in  package.json by doing this:
    	Open the terminal [ctrl + j] and run: npm install
    Install vite:plugin to allows react to support vite by running this command
    	npm install --save-dev @vitejs/plugin-react
    locate vite.config.js and add this:
    	import react from '@vitejs/plugin-react';
    	export default { plugins: [react(), ] };
    locate tailwind.config.js
        content: ["./resources/**/*.jsx",]

    npm install axios - responsible to make API request
    npm install react-router-dom - install React Router Library, used for navigation and routing

resources/js
change app.js -> app.jsx
create folder named components

    resources/js/components
        create a jsx file name login, register
        create router.jsx

    resources/views/welcome
        update it: <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                @viteReactRefresh
                @vite(["resources/css/app.css", "resources/js/app.jsx"])
            </head>
            <body>

                <div class="h-screen flex items-center justify-center" id="app"></div>

            </body>
            </html>

php artisan make:model UserProfile
php artisan make:migration create_experience_table
php artisan migrate

create a folder in storage/app/public to store user image - It's not a good practice to store

user-uploaded images directly inside the resources folder because it is meant for frontend assets like views, CSS, JS files, and compiling. These assets are typically compiled or processed, not used for storing dynamic user-uploaded files.
It’s recommended to store images in the storage folder, specifically storage/app/public, and then create a symbolic link to make the images publicly accessible.

php artisan storage:link - create a symbolic link, making the image store in public accessible publicly
