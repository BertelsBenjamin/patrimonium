<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Academy extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'headquarter', 'street', 'house_number', 'place_id', 'phone', 'fax', 'director_id', 'homepage_id', 'net_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
