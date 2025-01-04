<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserProfileController;
 
Route::post('/register', [UsersController::class, 'register']);
// Route::post('/profile', [UserProfileController::class, 'userData']);
Route::post('/login', [UsersController::class, 'login']);
Route::post('/', [UsersController::class, 'login']);
// Route::middleware('auth:api')->get('/home', [UsersController::class, 'home']);
Route::get('/home', [UsersController::class, 'home']);
Route::post('/logout', [UsersController::class, 'logout']);
// Route::post('/dashboard', [UserProfileController::class, 'index']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
