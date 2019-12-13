<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class PlaceController extends Controller
{

    public function showAllPlaces()
    {
        return response()->json(Place::all());
    }

    public function showOnePlace($id)
    {
        return response()->json(Place::find($id));
    }

    public function create(Request $request)
    {
        $place = Place::create($request->all());

        return response()->json($place, 201);
    }

    public function update($id, Request $request)
    {
        $place = Place::findOrFail($id);
        $place->update($request->all());

        return response()->json($place, 200);
    }

    public function delete($id)
    {
        Place::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}