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
        'user_username', 'user_password', 'user_created_at', 'user_country_code', 'user_last_name', 'user_first_name', 'user_user_department_id', 'user_user_function_id', 'user_level_id', 'user_email', 'user_mobile', 'user_province_id', 'user_birth_day'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
