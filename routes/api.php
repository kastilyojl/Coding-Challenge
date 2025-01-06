<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
 
// Handle POST request and direct it to the register method in UsersController
Route::post('/register', [UsersController::class, 'register']);

// Handle POST request and direct it to the login method in UsersController
Route::post('/login', [UsersController::class, 'login']);

// Handle POST request to the root endpoint it to the login method in UsersController
Route::post('/', [UsersController::class, 'login']);

// Handle Get request and direct it to the home method in UsersController
Route::get('/home', [UsersController::class, 'home']);

// Handle POST request and direct it to the logout method in UsersController
Route::post('/logout', [UsersController::class, 'logout']);