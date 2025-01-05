<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends Controller
{public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'imagePath' => 'required|image', // Validate if it's an image
            'phoneNumber' => 'nullable|string',
            'homeAddress' => 'required|string',
            'postalCode' => 'nullable|string',
            'about' => 'nullable|string',
            'skills' => 'nullable',
            'education' => 'nullable',
            'experience' => 'nullable',
        ]);
    
        if ($validator->fails()) {
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
    
        // Create the user profile with the image path
        $userprofile = UserProfile::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'user_pic' => $imagePath,  // Save the image path here
            'homeAddress' => $request->homeAddress,
            'postalCode' => $request->postalCode,
            'about' => $request->about,
            'skills' => $request->skills, // skills should be an array
            'education' => $request->education,
            'experience' => $request->experience,
        ]);
    
        $name = $request->firstName . ' ' . $request->lastName;
    
        // Create the user and return the JWT token
        $user = User::create([
            'name' => $name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        $token = JWTAuth::fromUser($user);
    
        return response()->json([
            'message' => 'User registered successfully',
            'user_profile' => $userprofile,
            'user' => $user,
            'token' => $token,
            'image_url' => asset('storage/' . $imagePath)
        ], 201);
    }
    

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8',
    ]);

    // Fetch the user by email
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['error' => 'Invalid email address'], 401);
    } elseif (!Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Incorrect password'], 401);
    }

    // Fetch user profile using the email
    $profile = UserProfile::where('email', $user->email)->first();  // Use email to fetch profile

    // Create the JWT token
    $token = JWTAuth::fromUser($user);

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user->makeHidden(['password', 'created_at', 'updated_at']),
        'profile' => $profile,  // Include profile data
    ]);
}


    public function home(Request $request)
    {
         try {
            $user = JWTAuth::parseToken()->authenticate()->load('profile');
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token is expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token not provided'], 401);
        }
    
    return response()->json([
            'user' => $user,
            'message' => 'Welcome to your dashboard'
        ]);
        
    }
    
    public function logout(Request $request)
    {
        try {
             $token = JWTAuth::getToken();
    
            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }
    
             JWTAuth::invalidate($token);
    
            return response()->json(['message' => 'Logged out successfully']);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Failed to log out'], 500);
        }
    }    
}
