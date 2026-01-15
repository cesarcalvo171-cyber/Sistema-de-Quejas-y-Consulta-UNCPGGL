<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DenunciaController extends Controller
{
     public function index()
    {
        return Denuncia::all();
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'Nombre_Completo' => 'required|string|max:100',
            'R_universitaria' => 'required|string',
            'Area' => 'required|string',
            'Telefono' => 'required|string',
            'Correo' => 'required|email',
            'Medio_Recepcion' => 'required|string',
            'Tipo_denuncia' => 'required|string',
            'Descripcion' => 'required|string',
            'fecha' => 'required|date',
            'persona_involucrada' => 'required|string',

            'Documentos' => 'nullable|file|mimes:pdf|max:5120',
            'Imagenes' => 'nullable|image|max:5120',
            'Video' => 'nullable|file|mimes:mp4,webm|max:51200',
        ]);

        if ($request->hasFile('Documentos')) {
            $data['Documentos'] = $request->file('Documentos')
                ->store('denuncias/documentos', 'public');
        }

        if ($request->hasFile('Imagenes')) {
            $data['Imagenes'] = $request->file('Imagenes')
                ->store('denuncias/imagenes', 'public');
        }

        if ($request->hasFile('Video')) {
            $data['Video'] = $request->file('Video')
                ->store('denuncias/videos', 'public');
        }

      $correlativo = DB::selectOne(
    "SELECT nextval('quejas.seq_numero_queja') AS num"
)->num;

$data['numeroRegistro'] = 'SQC-' 
    . str_pad($correlativo, 5, '0', STR_PAD_LEFT) 
    . '-UNCPGGL';
        $data['estado'] = 'Pendiente';

        Denuncia::create($data);

        return response()->json([
            'message' => 'Denuncia registrada correctamente',
            'numeroRegistro' => $data['numeroRegistro'],
        ], 201);
    }
}