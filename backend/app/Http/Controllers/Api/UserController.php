<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function loadUsers()
    {
        $users = User::with('role') // Ensure 'role' relationship is defined in the User model
            ->where('is_deleted', false)
            ->get();

        return response()->json([
            'users' => $users
        ], 200);
    }

    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required'],
            'middle_name' => ['nullable'],
            'last_name' => ['required'],
            'role' => ['required'],
            'email' => ['required', 'email', Rule::unique('tbl_users', 'email')],
            'password' => ['required', 'confirmed', 'min:8', 'max:15'],
            'password_confirmation' => ['required', 'min:8', 'max:15'],
        ]);

        User::create([
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'role_id' => $validated['role'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        return response()->json([
            'message' => 'User Successfully Added.'
        ], 200);
    }

    public function updateUser(Request $request, User $user)
{
    $validated = $request->validate([
        'first_name' => ['required', 'string', 'max:255'],
        'middle_name' => ['nullable', 'string', 'max:255'],
        'last_name' => ['required', 'string', 'max:255'],
        'role' => ['required', 'exists:tbl_roles,role_id'],
        'email' => ['required', 'email', Rule::unique('tbl_users', 'email')->ignore($user->user_id, 'user_id')],
    ]);

    $user->update([
        'first_name' => $validated['first_name'],
        'middle_name' => $validated['middle_name'],
        'last_name' => $validated['last_name'],
        'role_id' => $validated['role'],
        'email' => $validated['email'],
    ]);

    return response()->json([
        'message' => 'User successfully updated.'
    ], 200);
}


    public function destroyUser(User $user)
    {
        $user->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'User Successfully Deleted.'
        ], 200);
    }
}
