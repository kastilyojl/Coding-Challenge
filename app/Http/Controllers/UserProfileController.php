<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    //

    public function userData(Request $request) {
    $validator = Validator::make($request->all(), [
                'firstName' => 'required|string',
                'lastName' => 'required|string',
                'email' => 'required|email|unique:user_profile,email',
                'phoneNumber' => 'nullable|string',
                'homeAddress' => 'required|string',
                'postalCode' => 'string',
                'about' => 'nullable|string',
                'skills' => 'nullable|array', // skills should be an array
                'education' => 'nullable|array',
                'experience' => 'nullable|array',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $userprofile = UserProfile::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'phoneNumber' => $request->phoneNumber,
                'homeAddress' => $request->homeAddress,
                'postalCode' => $request->postalCode,
                'about' => $request->about,
            'skills' => $request->skills, // skills should be an array
            'education' => $request->education,
            'experience' => $request->experience,
    ]);

    return response()->json(['message' => 'User profile updated successfully'],200);
    
}
    
}


