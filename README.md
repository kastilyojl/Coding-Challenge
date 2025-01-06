## Laravel Project Setup

1.  Create a new Laravel project:

        laravel new [project_name]

2.  For starter kit:

        [none] – No authentication (choose this option)

        [breeze] – Simple Session-based authentication

        [jetstream] – Advanced Session-based authentication with additional features

3.  Testing framework

        [0] Pest

4.  For database:

        [mysql] (change based on your preference)

5.  Run default database migration:

-   When prompted, type [yes] to run the default database migration. This will automatically create a database (if the local server is running).

    -   If not, create the database manually first.
        Then, update the DB_DATABASE value in your .env file to the desired database name.

            Run the migration:

        In terminal, run:

                php artisan migrate

        This will run the database migrations.

6.  Enable API routes:

            php artisan install:api
        This will publish the API route file.

## JWT (JSON Web Token) Authentication Setup

Run the following command to install the package for JWT-based authentication:

    composer require tymon/jwt-auth

Publish the JWT configuration file:

    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

This will create the jwt.php configuration file in the config directory.

Run the following command to generate a secret key (this key will be stored in the .env file):

    php artisan jwt:secret

## React + Vite Setup

1.  Open the newly created Laravel project.
2.  Install all the dependencies listed in the package.json by running the following command in the terminal (Ctrl + J to open the terminal):

        npm install

    This includes Vite and Tailwind

3.  Install the Vite plugin to enable React support in Vite by running this command:

        npm install --save-dev @vitejs/plugin-react

4.  Install axios to handle API requests:

        npm install axios

5.  Install react-router-dom, which is the React Router library used for navigation and routing:

        npm install react-router-dom

## Store images in the storage folder and access them via URL

1.  Create a folder in storage/app/public to store user images.

    In terminal:

        php artisan storage:link

    This will creates a symbolic link between the public/storage directory and the storage/app/public directory, making files stored in the storage/app/public directory publicly accessible via a URL.
