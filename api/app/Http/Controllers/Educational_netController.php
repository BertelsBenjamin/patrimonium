<?php

namespace App\Http\Controllers;

use App\Director;
use Illuminate\Http\Request;

class Educational_netController extends Controller
{

    public function showAllEducational_nets()
    {
        return response()->json(Educational_net::all());
    }

    public function showOneEducational_net($id)
    {
        return response()->json(Educational_net::find($id));
    }

    public function create(Request $request)
    {
        $educational_net = Educational_net::create($request->all());

        return response()->json($educational_net, 201);
    }

    public function update($id, Request $request)
    {
        $educational_net = Educational_net::findOrFail($id);
        $educational_net->update($request->all());

        return response()->json($educational_net, 200);
    }

    public function delete($id)
    {
        Educational_net::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}
