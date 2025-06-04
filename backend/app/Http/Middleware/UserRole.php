<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserRole
{

    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $rolesArray = $roles;

        if (!$request->user()->hasAnyRole($rolesArray)) {
            return response()->json([
                'message' => 'You do not have permission to access this resource'
            ], 403);
        }

        return $next($request);
    }
}
