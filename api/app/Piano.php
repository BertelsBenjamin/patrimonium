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
        'sort_id', 'brand_id', 'type_id', 'serial_number', 'academy_id', 'room'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
