<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // Handle Http request
use App\Models\User; // import user class
use App\Models\UserProfile; // import user UserProfile
use Illuminate\Support\Facades\Validator; // import Validator that validates data
use Illuminate\Support\Facades\Hash; // import Hash for hashing password
use Tymon\JWTAuth\Facades\JWTAuth; 

class UsersController extends Controller
{
     // method responsible for register endpoint http request
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [ // Validate the data made by the request from user
            'email' => 'required|email|unique:users,email', // Validate that the email is not null, is a valid email address, and is unique.
            'password' => 'required|string|min:8', // validate that the password is not null and a string
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'imagePath' => 'required|image', // Validate if it's an image
            'phoneNumber' => 'nullable|string',
            'homeAddress' => 'required|string',
            'postalCode' => 'nullable|string',
            'about' => 'nullable|string', // can be null and a string
            'skills' => 'nullable', // can be null
            'education' => 'nullable', // can be null
            'experience' => 'nullable', // can be null
        ]);
    
        if ($validator->fails()) {  // check if validatoe failed, then return a json response
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Handle the image upload if it's present
        if ($request->hasFile('imagePath')) {
            // Store the image in the 'public/images' directory         
            $imagePath = $request->file('imagePath')->store('user_picture', 'public');
            // Remove the 'public/' part from the path for saving in the database
            $imagePath = str_replace('public/', '', $imagePath);           
        } else {
            $imagePath = null; // If no image is uploaded, set it as null
        }
    
        $userprofile = UserProfile::create([ // create/insert a data to UserProfile Model
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'user_pic' => $imagePath, 
            'homeAddress' => $request->homeAddress,
            'postalCode' => $request->postalCode,
            'about' => $request->about,
            'skills' => $request->skills,
            'education' => $request->education,
            'experience' => $request->experience,
        ]);
    
        $name = $request->firstName . ' ' . $request->lastName; // concatinate firstname and lastname
    
    
        $user = User::create([ // create/insert a data to User Model
            'name' => $name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Password is Hash for security
        ]);
    
        $token = JWTAuth::fromUser($user); // generate JWT Token for user
    
        return response()->json([ // return a json response if success.
            'message' => 'User registered successfully',
            'user_profile' => $userprofile, 
            'user' => $user,
            'token' => $token,
            'image_url' => asset('storage/' . $imagePath)
        ], 201);
    }
    

     // method responsible for login endpoint http request
    public function login(Request $request)
{
    $request->validate([ // Validate http request from user
        'email' => 'required|email', // Validate that the email is not null and a valid email
        'password' => 'required|min:8', // Validate that the password is not null and 8 char long
    ]);

    // Fetch the user by email
    $user = User::where('email', $request->email)->first();

    if (!$user) { // check if the email exist
        return response()->json(['error' => 'Invalid email address'], 401);
    } elseif (!Hash::check($request->password, $user->password)) { // if email exist, check password
        return response()->json(['error' => 'Incorrect password'], 401);
    }

    // Fetch user profile using the email
    $profile = UserProfile::where('email', $user->email)->first(); 

    // Create the JWT token
    $token = JWTAuth::fromUser($user);

    return response()->json([  // return a json response if success.
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user->makeHidden(['password', 'created_at', 'updated_at']), // hide for security
        'profile' => $profile, 
    ]);
}


    // method responsible for home endpoint http request
    public function home(Request $request)
    {
        // try-catch block handle exceptions
         try {
            // Attempt to parse the token, authenticate the user, and load the profile data
            $user = JWTAuth::parseToken()->authenticate()->load('profile');
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token is expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token not provided'], 401);
        }
    
    return response()->json([ // return json response if success
            'user' => $user,
            'message' => 'Welcome to your dashboard'
        ]);
        
    }
    
    // method responsible for logout endpoint http request
    public function logout(Request $request)
    {
        // try-catch block handle exceptions
        try {
             $token = JWTAuth::getToken();
    
            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }
    
            // invalidate the token once logout
             JWTAuth::invalidate($token);
    
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Failed to log out'], 500);
        }
    }    
}
