<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcademiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('academies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->boolean('headquarter');
            $table->string('street');
            $table->string('house_number');
            $table->integer('place_id');
            $table->string('phone');
            $table->string('fax');
            $table->integer('director_id');
            $table->integer('homepage_id');
            $table->integer('net_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('academies');
    }
}
