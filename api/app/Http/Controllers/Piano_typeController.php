<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class Piano_typeController extends Controller
{

    public function showAllPiano_types()
    {
        return response()->json(Piano_type::all());
    }

    public function showOnePiano_type($id)
    {
        return response()->json(Piano_type::find($id));
    }

    public function create(Request $request)
    {
        $piano_type = Piano_type::create($request->all());

        return response()->json($piano_type, 201);
    }

    public function update($id, Request $request)
    {
        $piano_type = Piano_type::findOrFail($id);
        $piano_type->update($request->all());

        return response()->json($piano_type, 200);
    }

    public function delete($id)
    {
        Piano_type::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
