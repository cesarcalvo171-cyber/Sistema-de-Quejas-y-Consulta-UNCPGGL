<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Resolucion extends Model
{
    protected $table = 'quejas.resoluciones';

    protected $fillable = [
        'denuncia_id',
        'decision',
        'fundamento',
        'medidas',
        'fecha_resolucion',
        'resolutor_id'
    ];

    protected $casts = [
        'medidas' => 'array'
    ];
}