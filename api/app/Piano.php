<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Piano extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'piano_sort_id', 'piano_brand_id', 'piano_type_id', 'piano_serial_number', 'piano_academy_id', 'piano_room'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
