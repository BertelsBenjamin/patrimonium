<?php

namespace App\Http\Controllers;

use App\Homepage;
use Illuminate\Http\Request;

class HomepageController extends Controller
{

    public function showAllHomepages()
    {
        return response()->json(Homepage::all());
    }

    public function showOneHomepage($id)
    {
        return response()->json(Homepage::find($id));
    }

    public function create(Request $request)
    {
        $homepage = Homepage::create($request->all());

        return response()->json($homepage, 201);
    }

    public function update($id, Request $request)
    {
        $homepage = Homepage::findOrFail($id);
        $homepage->update($request->all());

        return response()->json($homepage, 200);
    }

    public function delete($id)
    {
        Homepage::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
