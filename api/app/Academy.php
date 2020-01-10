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
        'academy_name', 'academy_headquarter', 'academy_street', 'academy_house_number', 'academy_place_id', 'academy_phone', 'academy_fax', 'academy_director_id', 'academy_homepage_id', 'academy_net_id'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
