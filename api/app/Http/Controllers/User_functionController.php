<?php

namespace App\Http\Controllers;

use App\User_function;
use Illuminate\Http\Request;

class User_functionController extends Controller
{

    public function showAllUser_functions()
    {
        return response()->json(User_function::all());
    }

    public function showOneUser_function($id)
    {
        return response()->json(User_function::find($id));
    }

    public function create(Request $request)
    {
        $user_function = User_function::create($request->all());

        return response()->json($user_function, 201);
    }

    public function update($id, Request $request)
    {
        $user_function = User_function::findOrFail($id);
        $user_function->update($request->all());

        return response()->json($user_function, 200);
    }

    public function delete($id)
    {
        User_function::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
