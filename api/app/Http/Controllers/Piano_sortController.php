<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class Piano_sortController extends Controller
{

    public function showAllPiano_sorts()
    {
        return response()->json(Piano_sort::all());
    }

    public function showOnePiano_sort($id)
    {
        return response()->json(Piano_sort::find($id));
    }

    public function create(Request $request)
    {
        $piano_sort = Piano_sort::create($request->all());

        return response()->json($piano_sort, 201);
    }

    public function update($id, Request $request)
    {
        $piano_sort = Piano_sort::findOrFail($id);
        $piano_sort->update($request->all());

        return response()->json($piano_sort, 200);
    }

    public function delete($id)
    {
        Piano_sort::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
