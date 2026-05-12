<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class MedidaCorrectiva extends Model
{
    protected $table = 'quejas.medidas_correctivas';

    protected $fillable = [
        'seguimiento_id',
        'descripcion',
        'responsable',
        'fecha_prevista',
        'fecha_cumplimiento',
        'estado',
        'observaciones'
    ];
}