<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class PianoController extends Controller
{

    public function showAllPianos()
    {
        return response()->json(Piano::all());
    }

    public function showOnePiano($id)
    {
        return response()->json(Piano::find($id));
    }

    public function create(Request $request)
    {
        $piano = Piano::create($request->all());

        return response()->json($piano, 201);
    }

    public function update($id, Request $request)
    {
        $piano = Piano::findOrFail($id);
        $piano->update($request->all());

        return response()->json($piano, 200);
    }

    public function delete($id)
    {
        Piano::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
