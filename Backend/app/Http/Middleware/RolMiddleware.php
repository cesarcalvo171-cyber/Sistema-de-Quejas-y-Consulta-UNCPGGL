<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RolMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user(); // 🔥 la forma correcta en APIs

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        if (!in_array($user->rol, $roles)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return $next($request);
    }
}