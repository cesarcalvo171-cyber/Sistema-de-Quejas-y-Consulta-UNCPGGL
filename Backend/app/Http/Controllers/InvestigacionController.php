<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Investigacion;
use App\Models\Denuncia;
class InvestigacionController extends Controller
{
   public function store(Request $request)
{
    $data = $request->validate([
        'denuncia_id' => 'required|exists:quejas.denuncias,id',
        'equipo' => 'required',
        'metodologia' => 'required|array',
        'hallazgos' => 'required',
        'analisis' => 'required',
        'conclusiones' => 'required',
        'fecha_inicio' => 'required|date',
    ]);

    $data['responsable_id'] = auth()->id();

    Investigacion::create($data);

    Denuncia::where('id', $data['denuncia_id'])
        ->update(['estado' => 'INVESTIGACION']);

    return response()->json(['message' => 'Investigación registrada']);
}
}
