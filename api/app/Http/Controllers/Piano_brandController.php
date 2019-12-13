<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class Piano_brandController extends Controller
{

    public function showAllPiano_brands()
    {
        return response()->json(Piano_brand::all());
    }

    public function showOnePiano_brand($id)
    {
        return response()->json(Piano_brand::find($id));
    }

    public function create(Request $request)
    {
        $piano_brand = Piano_brand::create($request->all());

        return response()->json($piano_brand, 201);
    }

    public function update($id, Request $request)
    {
        $piano_brand = Piano_brand::findOrFail($id);
        $piano_brand->update($request->all());

        return response()->json($piano_brand, 200);
    }

    public function delete($id)
    {
        Piano_brand::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
