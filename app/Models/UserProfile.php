<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Models\User;

class UserProfile extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'user_profile';  // Correct table name (singular)
    
   protected $fillable = [
       'firstName',
       'lastName',
       'email',
       'phoneNumber',
       'homeAddress',
       'postalCode',
       'about',
       'skills',
       'education',
       'experience'
   ];

   protected $casts = [
    'skills' => 'array', // Cast JSON to array
    'education' => 'array', // Cast JSON to array
    'experience' => 'array', // Cast JSON to array
];

public function profile()
{
    return $this->belongsTo(User::class, 'email', 'email');
}

}
