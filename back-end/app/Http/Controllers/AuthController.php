<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data  = $request->validate([
            'name' => ['required'],
            'password' => ['required']
        ]);

        $user = User::where('name', $data['name'])->first();

        if (!$user || ($data['password'] !== $user->password)) {
            return response(['Bad credentials'], 401);
        }

        $token = $user->createToken('myToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return 'Logged out';
    }
}
