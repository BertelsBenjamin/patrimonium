<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'director_last_name', 'director_first_name', 'director_email'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
