<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();

        return response()->json([
            'status' => true,
            'message' => 'Users retrieved',
            'data' => $user,
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);

        return response()->json([
            'status' => true,
            'message' => 'Single user retrieved',
            'data' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'status' => ['sometimes', 'required'],
            'name' => ['sometimes', 'required'],
            'age' => ['sometimes', 'required'],
            'position' => ['sometimes', 'required'],
            'gender' => ['sometimes', 'required', Rule::in(['male', 'Male', 'female', 'Female'])],
            'date' => ['sometimes', 'required'],
            'admin' => ['sometimes', 'required'],
            'password' => ['sometimes', 'required']
        ]);

        $user = User::find($id);

        if ($user) {
            $user->update($data);
            return response()->json([
                'status' => true,
                'message' => 'User updated',
                'data' => $user,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
                'data' => null,
            ], 404);
        }
    }

    public function create(Request $request)
    {
        $data  = $request->validate([
            'status' => ['required'],
            'name' => ['required'],
            'age' => ['required'],
            'position' => ['required'],
            'gender' => ['sometimes', 'required', Rule::in(['male', 'Male', 'female', 'Female'])],
            'date' => ['required'],
            'admin' => ['required'],
            'password' => ['required']
        ]);

        $user = User::create($data);

        return response(['user' => $user], 201);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json([
                'status' => true,
                'message' => 'User deleted',
                'data' => null,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'User not found',
                'data' => null,
            ], 404);
        }
    }
}
