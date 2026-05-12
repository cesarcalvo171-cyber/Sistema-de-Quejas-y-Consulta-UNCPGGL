<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EvaluacionPreliminar;
use App\Models\Denuncia;

class EvaluacionController extends Controller
{
public function store(Request $request)
{
    $data = $request->validate([
        'denuncia_id' => 'required|exists:denuncias,id',
        'tipo_Evaluacion_premilinar' => 'required|string',
        'Instancia_Receptora' => 'nullable|string',
        'Nombre_Participante' => 'nullable|string',
        'Cargo_Participante' => 'nullable|string',
        'Analisis' => 'required|string',
        'Resultado' => 'required|string',
        'Observaciones' => 'nullable|string',
    ]);

    $data['evaluador_id'] = auth()->id();

    EvaluacionPreliminar::create($data);

    Denuncia::where('id', $data['denuncia_id'])
        ->update(['estado' => 'EVALUACION']);

    return response()->json([
        'message' => 'Evaluación registrada correctamente'
    ]);
}
}