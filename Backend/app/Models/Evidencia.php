<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Evidencia extends Model
{
    protected $table = 'quejas.evidencias';

    protected $fillable = ['denuncia_id','tipo','ruta'];

    public function denuncia()
    {
        return $this->belongsTo(Denuncia::class);
    }
}