<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{

    public function showAllProvinces()
    {
        return response()->json(Province::all());
    }

    public function showOneProvince($id)
    {
        return response()->json(Province::find($id));
    }

    public function create(Request $request)
    {
        $province = Province::create($request->all());

        return response()->json($province, 201);
    }

    public function update($id, Request $request)
    {
        $province = Province::findOrFail($id);
        $province->update($request->all());

        return response()->json($province, 200);
    }

    public function delete($id)
    {
        Province::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
