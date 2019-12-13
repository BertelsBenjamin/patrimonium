<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePianosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pianos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sort_id');
            $table->integer('brand_id');
            $table->integer('type_id');
            $table->string('serial_number');
            $table->integer('academy_id');
            $table->string('room');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pianos');
    }
}
