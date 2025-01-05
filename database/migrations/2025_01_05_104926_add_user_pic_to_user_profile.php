<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * php artisan migrate --path=database/migrations/2025_01_05_104926_add_user_pic_to_user_profile.php
     */
    public function up(): void
    {
        Schema::table('user_profile', function (Blueprint $table) {
            $table->string('user_pic');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_profile', function (Blueprint $table) {
            $table->string('user_pic');
        });
    }
};
