<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Denuncia;
use App\Models\Seguimiento;
use App\Models\MedidaCorrectiva;


class SeguimientoController extends Controller
{
    public function store(Request $request)
{
    $data = $request->validate([
        'denuncia_id' => 'required|exists:quejas.denuncias,id',
        'unidad' => 'required',
        'responsable' => 'required',
        'conclusion' => 'required',
        'medidas' => 'required|array'
    ]);

    $seguimiento = Seguimiento::create($data);

    foreach ($data['medidas'] as $m) {
        MedidaCorrectiva::create([
            'seguimiento_id' => $seguimiento->id,
            ...$m
        ]);
    }

    Denuncia::where('id', $data['denuncia_id'])
        ->update(['estado' => 'SEGUIMIENTO']);

    return response()->json(['message' => 'Seguimiento registrado']);
}
}
