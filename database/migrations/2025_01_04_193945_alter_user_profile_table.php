<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    // php artisan make:migration alter_users_table - this file will created
    // modified this file to update your database
    // php artisan migrate to apply the changes

    public function up(): void
    {
        Schema::table('user_profile', function (Blueprint $table) {
           
            $table->string('email')->unique()->change();
            $table->string('phoneNumber')->nullable()->change();

            $table->string('postalCode')->nullable()->change();
            $table->string('about')->nullable()->change();
            
        });
    }

    public function down(): void
    {
        Schema::table('user_profile', function (Blueprint $table) {
           
            $table->string('email')->unique()->change();
            $table->string('phoneNumber')->nullable(false)->change();

            $table->string('postalCode')->nullable(false)->change();
            $table->string('about')->nullable(false)->change();
            
        });
    }
};
