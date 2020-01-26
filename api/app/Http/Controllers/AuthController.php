<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\User;

class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function register(Request $request)
    {
        //validate incoming request
        $this->validate($request, [
            'user_username' => 'required|string',
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|confirmed',
        ]);

        try {

            $user = new User;
            $user->user_username = $request->input('user_username');
            $user->user_email = $request->input('user_email');
            $plainPassword = $request->input('user_password');
            $user->user_password = app('hash')->make($plainPassword);

            $user->save();

            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => $e], 409);
        }

    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {
          //validate incoming request
        $this->validate($request, [
            'user_email' => 'required|string',
            'user_password' => 'required|string',
        ]);

        $credentials = $request->only(['user_email', 'user_password']);

        if (Auth::guard('api')->attempt($credentials, false, false)) {
            return ['result' => 'ok'];
        }

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
}
