<?php

namespace App\Http\Controllers;

use App\User_department;
use Illuminate\Http\Request;

class User_departmentController extends Controller
{

    public function showAllUser_departments()
    {
        return response()->json(User_department::all());
    }

    public function showOneUser_department($id)
    {
        return response()->json(User_department::find($id));
    }

    public function create(Request $request)
    {
        $user_department = User_department::create($request->all());

        return response()->json($user_department, 201);
    }

    public function update($id, Request $request)
    {
        $user_department = User_department::findOrFail($id);
        $user_department->update($request->all());

        return response()->json($user_department, 200);
    }

    public function delete($id)
    {
        User_department::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
