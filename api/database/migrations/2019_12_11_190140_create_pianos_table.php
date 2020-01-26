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
            $table->increments('piano_id');
            $table->integer('piano_sort_id');
            $table->integer('piano_brand_id');
            $table->integer('piano_type_id');
            $table->string('piano_serial_number');
            $table->integer('piano_academy_id');
            $table->string('piano_room');
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
