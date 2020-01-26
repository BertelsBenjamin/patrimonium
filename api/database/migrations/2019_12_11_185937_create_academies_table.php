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
            $table->increments('academy_id');
            $table->string('academy_name');
            $table->boolean('academy_headquarter');
            $table->string('academy_street');
            $table->string('academy_house_number');
            $table->integer('academy_place_id');
            $table->string('academy_phone');
            $table->string('academy_fax');
            $table->integer('academy_director_id');
            $table->integer('academy_homepage_id');
            $table->integer('academy_net_id');

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
