<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Seguimiento extends Model
{
    protected $table = 'quejas.seguimientos';

    protected $fillable = [
        'denuncia_id',
        'unidad',
        'responsable',
        'conclusion',
        'evidencias'
    ];

    public function medidas()
    {
        return $this->hasMany(MedidaCorrectiva::class);
    }
}