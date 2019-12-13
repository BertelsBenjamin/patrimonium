<?php

namespace App\Http\Controllers;

use App\Academy;
use Illuminate\Http\Request;

class AcademyController extends Controller
{

    public function showAllAcademies()
    {
        return response()->json(Academy::all());
    }

    public function showOneAcademy($id)
    {
        return response()->json(Academy::find($id));
    }

    public function create(Request $request)
    {
        $academy = Academy::create($request->all());

        return response()->json($academy, 201);
    }

    public function update($id, Request $request)
    {
        $academy = Academy::findOrFail($id);
        $academy->update($request->all());

        return response()->json($academy, 200);
    }

    public function delete($id)
    {
        Academy::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
