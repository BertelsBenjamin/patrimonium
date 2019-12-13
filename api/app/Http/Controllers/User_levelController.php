<?php

namespace App\Http\Controllers;

use App\User_level;
use Illuminate\Http\Request;

class User_levelController extends Controller
{

    public function showAllUser_levels()
    {
        return response()->json(User_level::all());
    }

    public function showOneUser_level($id)
    {
        return response()->json(User_level::find($id));
    }

    public function create(Request $request)
    {
        $user_level = User_level::create($request->all());

        return response()->json($user_level, 201);
    }

    public function update($id, Request $request)
    {
        $user_level = User_level::findOrFail($id);
        $user_level->update($request->all());

        return response()->json($user_level, 200);
    }

    public function delete($id)
    {
        User_level::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
