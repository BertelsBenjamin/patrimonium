<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {

  // ACADEMIES
  $router->get('academies',  ['uses' => 'AcademyController@showAllAcademies']);
  $router->get('academies/detail/{id}', ['uses' => 'AcademyController@showOneAcademy']);
  $router->get('academies/basic-info', ['uses' => 'AcademyController@basicInfo']);
  $router->post('academies', ['uses' => 'AcademyController@create']);
  $router->delete('academies/{id}', ['uses' => 'AcademyController@delete']);
  $router->put('academies/{id}', ['uses' => 'AcademyController@update']);

  // DIRECTORS
  $router->get('directors',  ['uses' => 'DirectorController@showAllDirectors']);
  $router->get('directors/{id}', ['uses' => 'DirectorController@showOneDirector']);
  $router->post('directors', ['uses' => 'DirectorController@create']);
  $router->delete('directors/{id}', ['uses' => 'DirectorController@delete']);
  $router->put('directors/{id}', ['uses' => 'DirectorController@update']);

  // EDUCATIONAL NETS
  $router->get('educational_nets',  ['uses' => 'Educational_netController@showAllEducational_nets']);
  $router->get('educational_nets/{id}', ['uses' => 'Educational_netController@showOneEducational_net']);
  $router->post('educational_nets', ['uses' => 'Educational_netController@create']);
  $router->delete('educational_nets/{id}', ['uses' => 'Educational_netController@delete']);
  $router->put('educational_nets/{id}', ['uses' => 'Educational_netController@update']);

  // HOMEPAGES
  $router->get('homepages',  ['uses' => 'HomepageController@showAllHomepages']);
  $router->get('homepages/{id}', ['uses' => 'HomepageController@showOneHomepage']);
  $router->post('homepages', ['uses' => 'HomepageController@create']);
  $router->delete('homepages/{id}', ['uses' => 'HomepageController@delete']);
  $router->put('homepages/{id}', ['uses' => 'HomepageController@update']);

  // PIANO BRANDS
  $router->get('piano_brands',  ['uses' => 'Piano_brandController@showAllPiano_brands']);
  $router->get('piano_brands/{id}', ['uses' => 'Piano_brandController@showOnePiano_brand']);
  $router->post('piano_brands', ['uses' => 'Piano_brandController@create']);
  $router->delete('piano_brands/{id}', ['uses' => 'Piano_brandController@delete']);
  $router->put('piano_brands/{id}', ['uses' => 'Piano_brandController@update']);

  // PIANO SORTS
  $router->get('piano_sorts',  ['uses' => 'Piano_sortController@showAllPiano_sorts']);
  $router->get('piano_sorts/{id}', ['uses' => 'Piano_sortController@showOnePiano_sort']);
  $router->post('piano_sorts', ['uses' => 'Piano_sortController@create']);
  $router->delete('piano_sorts/{id}', ['uses' => 'Piano_sortController@delete']);
  $router->put('piano_sorts/{id}', ['uses' => 'Piano_sortController@update']);

  // PIANO TYPES
  $router->get('piano_types',  ['uses' => 'Piano_typeController@showAllPiano_types']);
  $router->get('piano_types/{id}', ['uses' => 'Piano_typeController@showOnePiano_type']);
  $router->post('piano_types', ['uses' => 'Piano_typeController@create']);
  $router->delete('piano_types/{id}', ['uses' => 'Piano_typeController@delete']);
  $router->put('piano_types/{id}', ['uses' => 'Piano_typeController@update']);

  // PIANOS
  $router->get('pianos',  ['uses' => 'PianoController@showAllPianos']);
  $router->get('pianos/{id}', ['uses' => 'PianoController@showOnePiano']);
  $router->post('pianos', ['uses' => 'PianoController@create']);
  $router->delete('pianos/{id}', ['uses' => 'PianoController@delete']);
  $router->put('pianos/{id}', ['uses' => 'PianoController@update']);

  // PLACES
  $router->get('places',  ['uses' => 'PlaceController@showAllPlaces']);
  $router->get('places/{id}', ['uses' => 'PlaceController@showOnePlace']);
  $router->post('places', ['uses' => 'PlaceController@create']);
  $router->delete('places/{id}', ['uses' => 'PlaceController@delete']);
  $router->put('places/{id}', ['uses' => 'PlaceController@update']);

  // PROVINCES
  $router->get('provinces',  ['uses' => 'ProvinceController@showAllProvinces']);
  $router->get('provinces/{id}', ['uses' => 'ProvinceController@showOneProvince']);
  $router->post('provinces', ['uses' => 'ProvinceController@create']);
  $router->delete('provinces/{id}', ['uses' => 'ProvinceController@delete']);
  $router->put('provinces/{id}', ['uses' => 'ProvinceController@update']);

  // USER DEPARTMENTS
  $router->get('user_departments',  ['uses' => 'User_departmentController@showAllUser_departments']);
  $router->get('user_departments/{id}', ['uses' => 'User_departmentController@showOneUser_department']);
  $router->post('user_departments', ['uses' => 'User_departmentController@create']);
  $router->delete('user_departments/{id}', ['uses' => 'User_departmentController@delete']);
  $router->put('user_departments/{id}', ['uses' => 'User_departmentController@update']);

  // USER FUNCTIONS
  $router->get('user_functions',  ['uses' => 'User_functionController@showAllUser_functions']);
  $router->get('user_functions/{id}', ['uses' => 'User_functionController@showOneUser_function']);
  $router->post('user_functions', ['uses' => 'User_functionController@create']);
  $router->delete('user_functions/{id}', ['uses' => 'User_functionController@delete']);
  $router->put('user_functions/{id}', ['uses' => 'User_functionController@update']);

  // USER LEVELS
  $router->get('user_levels',  ['uses' => 'User_levelController@showAllUser_levels']);
  $router->get('user_levels/{id}', ['uses' => 'User_levelController@showOneUser_level']);
  $router->post('user_levels', ['uses' => 'User_levelController@create']);
  $router->delete('user_levels/{id}', ['uses' => 'User_levelController@delete']);
  $router->put('user_levels/{id}', ['uses' => 'User_levelController@update']);

  // USERS
  $router->get('users',  ['uses' => 'UserController@showAllUsers']);
  $router->get('users/{id}', ['uses' => 'UserController@showOneUser']);
  $router->post('users', ['uses' => 'UserController@create']);
  $router->delete('users/{id}', ['uses' => 'UserController@delete']);
  $router->put('users/{id}', ['uses' => 'UserController@update']);
});
