<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investigacion extends Model
{
    protected $table = 'quejas.investigaciones';

    protected $fillable = [
        'denuncia_id',
        'equipo',
        'metodologia',
        'hallazgos',
        'analisis',
        'conclusiones',
        'fecha_inicio',
        'fecha_cierre',
        'responsable_id'
    ];

    protected $casts = [
        'metodologia' => 'array'
    ];
}