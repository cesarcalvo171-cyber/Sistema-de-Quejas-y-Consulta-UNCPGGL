<?php

namespace App\Http\Controllers;

use App\Http\Requests\DenunciaRequest;
use App\Http\Services\DenunciaService;
use App\Models\Denuncia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class DenunciaController extends Controller
{
    protected DenunciaService $service;

    public function __construct()
    {
        $this->service = new DenunciaService();
    }

    public function store(DenunciaRequest $request)
    {
        $data= $request->validated();

        $data['numeroregistro'] = $this->service->crearNumeroRegistro();
        $data['estado'] = 'Pendiente';

        //  IMPORTANTE: quitamos archivos del array
        unset($data['Documentos'], $data['Imagenes'], $data['Video']);

        //  Crear denuncia primero
        //$denuncia = Denuncia::create($data);

        //  Ahora sí guardamos evidencias
        foreach (['Documentos', 'Imagenes', 'Video'] as $tipo) {
            if ($request->hasFile($tipo)) {
                $ruta = $request->file($tipo)->store("denuncias/$tipo", 'public');

                DB::table('quejas.evidencias')->insert([
                    'denuncia_id' => $denuncia->id,
                    'tipo' => strtolower($tipo),
                    'ruta' => $ruta,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return response()->json([
            'message' => 'Denuncia registrada correctamente',
            'numeroRegistro' => $data['numeroRegistro'],
        ], 200);
    }
    public function denunciasParaRevisor()
    {
        $denuncias = Denuncia::where('estado', 'Pendiente')
            ->select(
                'id',
                'numeroRegistro',
                'Nombre_Completo',
                'Tipo_denuncia',
                'estado'
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($denuncias);
    }
    public function detalleDenuncia($id)
    {
        $denuncia = Denuncia::with('evidencias')
            ->findOrFail($id);

        return response()->json($denuncia);
    }
    public function show($id)
    {
        $d = Denuncia::findOrFail($id);

        return response()->json([
            'id' => $d->id,
            'numeroRegistro' => $d->numeroRegistro,
            'fecha' => $d->fecha,
        ]);
    }
}
