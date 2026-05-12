<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resolucion;
use App\Models\Denuncia;

class ResolucionController extends Controller
{
    public function store(Request $request)
{
    $data = $request->validate([
        'denuncia_id' => 'required|exists:quejas.denuncias,id',
        'decision' => 'required',
        'fundamento' => 'required',
        'medidas' => 'required|array',
        'fecha_resolucion' => 'required|date',
    ]);

    $data['resolutor_id'] = auth()->id();

    Resolucion::create($data);

    Denuncia::where('id', $data['denuncia_id'])
        ->update(['estado' => 'RESUELTA']);

    return response()->json(['message' => 'Resolución registrada']);
}
}
