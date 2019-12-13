<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{

    public function showAllDirectors()
    {
        return response()->json(Director::all());
    }

    public function showOneDirector($id)
    {
        return response()->json(Director::find($id));
    }

    public function create(Request $request)
    {
        $director = Director::create($request->all());

        return response()->json($director, 201);
    }

    public function update($id, Request $request)
    {
        $director = Director::findOrFail($id);
        $director->update($request->all());

        return response()->json($director, 200);
    }

    public function delete($id)
    {
        Director::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
