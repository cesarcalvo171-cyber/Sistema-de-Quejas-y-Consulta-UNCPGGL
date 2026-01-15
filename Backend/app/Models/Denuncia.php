<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    protected $table = 'quejas.denuncias';

    protected $fillable = [
        'Nombre_Completo',
        'R_universitaria',
        'otro_R_universitaria',
        'Area',
        'Otro_area',
        'Telefono',
        'Correo',
        'Medio_Recepcion',
        'Tipo_denuncia',
        'otros_tipo_denuncia',
        'Descripcion',
        'fecha',
        'persona_involucrada',
        'persona_nombre',
        'area_nombre',
        'Documentos',
        'Imagenes',
        'Video',
        'numeroRegistro',
        'estado',
    ];
}