<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class RoleController extends Controller
{

    public function index(Request $request)
{
    if ($request->user()->role !== 'manager' && $request->user()->role !== 'administrator') {
        return response()->json(['message' => "Forbidden"], 403);
    }

    $roles = Role::all();
    return response()->json(['roles' => $roles], 200);
}

    public function loadRoles()



    {
        $roles = Role::where('tbl_roles.is_deleted', false)->get();

        return response()->json([
            'roles' => $roles
        ], 200);
    }

    public function getRole($roleId)
    {
        $role = Role::find($roleId);

        return response()->json([
            'role' => $role
        ], 200);
    }

    public function storeRole(Request $request)
    {
        $validated = $request->validate([
            'role' => ['required', 'min:4', 'max:55']
        ]);

        Role::create([
            'role' => $validated['role']
        ]);

        return response()->json([
            'message' => 'Role Successfully Added.'
        ], 200);
    }

    public function updateRole(Request $request, Role $role)
    {
        $validated = $request->validate([
            'role' => ['required', 'min:4', 'max:55']
        ]);

        $role->update([
            'role' => $validated['role']
        ]);

        return response()->json([
            'message' => 'Role Successfully Updated.'
        ], 200);
    }

    public function destroyRole(Role $role)
    {
        $role->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Role Successfully Deleted.'
        ], 200);
    }
}
