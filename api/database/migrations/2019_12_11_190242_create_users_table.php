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
            $table->increments('id');
            $table->string('username');
            $table->string('password');
            $table->timestamp('created_at');
            $table->string('country_code');
            $table->string('last_name');
            $table->string('first_name');
            $table->integer('department_id');
            $table->integer('function_id');
            $table->integer('level_id');
            $table->string('email');
            $table->string('mobile');
            $table->integer('province_id');
            $table->string('birth_day');
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
