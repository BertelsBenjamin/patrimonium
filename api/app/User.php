<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'password', 'created_at', 'country_code', 'last_name', 'first_name', 'user_department_id', 'user_function_id', 'user_level_id', 'email', 'mobile', 'province_id', 'birth_day'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
