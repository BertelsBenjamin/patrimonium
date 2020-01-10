<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'place_postal_code', 'place_name', 'place_submunicipality', 'place_main_municipality', 'place_province_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
