<?php

namespace App\Http\Controllers;

use App\Academy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AcademyController extends Controller
{
    public function showAllAcademies()
    {
        $academies = DB::select("SELECT
                                    academies.academy_id,
                                    academies.academy_name,
                                    academies.academy_headquarter,
                                    academies.academy_street,
                                    academies.academy_house_number,
                                    academies.academy_phone,
                                    academies.academy_fax,
                                    places.place_name AS academy_place_name
                                FROM academies
                                JOIN places ON academies.academy_place_id = places.place_id
                                JOIN directors ON academies.academy_director_id = directors.director_id
                                JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id
                                JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id");
        return response() -> json($academies, 200);
    }

    public function showOneAcademy($id)
    {
        /* settype($id, "integer"); */
        $academy = DB::select("SELECT
                                    academies.academy_id,
                                    academies.academy_name,
                                    academies.academy_headquarter,
                                    academies.academy_street,
                                    academies.academy_house_number,
                                    academies.academy_phone,
                                    academies.academy_fax,
                                    places.place_name AS academy_place_name
                                FROM academies
                                JOIN places ON academies.academy_place_id = places.place_id
                                JOIN directors ON academies.academy_director_id = directors.director_id
                                JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id
                                JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id
                                WHERE academies.academy_id = $id");
        return response() -> json($academy, 200);
    }

    public function filterAcademies($input){
        $academies = DB::select("SELECT
                                    academies.academy_id,
                                    academies.academy_name,
                                    academies.academy_headquarter,
                                    academies.academy_street,
                                    academies.academy_house_number,
                                    academies.academy_phone,
                                    academies.academy_fax,
                                    places.place_name AS academy_place_name
                                FROM academies
                                JOIN places ON academies.academy_place_id = places.place_id
                                JOIN directors ON academies.academy_director_id = directors.director_id
                                JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id
                                JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id
                                WHERE academies.academy_id LIKE '%$input%'
                                    OR academies.academy_name LIKE '%$input%'
                                    OR academies.academy_street LIKE '%$input%'
                                    OR academies.academy_house_number LIKE '%$input%'
                                    OR academies.academy_phone LIKE '%$input%'
                                    OR academies.academy_fax LIKE '%$input%'
                                    OR places.place_name LIKE '%$input%'"
                                        );
        return response() -> json($academies, 200);
    }

    public function filterHQ($value){
        $academies = DB::select("SELECT
                                    academies.academy_id,
                                    academies.academy_name,
                                    academies.academy_headquarter,
                                    academies.academy_street,
                                    academies.academy_house_number,
                                    academies.academy_phone,
                                    academies.academy_fax,
                                    places.place_name AS academy_place_name
                                FROM academies
                                JOIN places ON academies.academy_place_id = places.place_id
                                JOIN directors ON academies.academy_director_id = directors.director_id
                                JOIN homepages ON academies.academy_homepage_id = homepages.homepage_id
                                JOIN educational_nets ON academies.academy_net_id = educational_nets.educational_net_id
                                WHERE academies.academy_headquarter LIKE '%$value%'");
        return response() -> json($academies, 200);
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

    public function basicInfo ()
    {
        try {
            return response()->json($data, 200);
        } catch (\Illuminate\Database\QueryException $ex) {
            $res['success'] = false;
            $res['message'] = $ex->getMessage();
            return response($res, 500);
        }
        return response('Joined succesfully', 200);
    }
}
