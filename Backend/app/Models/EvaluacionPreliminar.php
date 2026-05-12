<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class EvaluacionPreliminar extends Model
{
    protected $table = 'evaluaciones_preliminares';

    protected $fillable = [
        'denuncia_id',
        'evaluador_id',
        'fecha',
        'tipo_Evaluacion_premilinar',
        'Instancia_Receptora',
        'Nombre_Participante',
        'Cargo_Participante',
        'Analisis',
        'Resultado',
        'Observaciones',
    ];

    public function denuncia()
    {
        return $this->belongsTo(Denuncia::class);
    }
}