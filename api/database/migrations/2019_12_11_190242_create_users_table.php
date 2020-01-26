<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('user_username');
            $table->string('user_password');
            $table->timestamp('user_created_at');
            $table->string('user_country_code');
            $table->string('user_last_name');
            $table->string('user_first_name');
            $table->integer('user_department_id');
            $table->integer('user_function_id');
            $table->integer('user_level_id');
            $table->string('user_email')->unique()->notNullable();
            $table->string('user_mobile');
            $table->integer('user_province_id');
            $table->string('user_birth_day');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
