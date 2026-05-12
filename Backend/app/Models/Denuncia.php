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
        'numeroregistro',
        'estado',
];

    public function evidencias()
    {
        return $this->hasMany(Evidencia::class);
    }

    public function evaluacion()
    {
        return $this->hasOne(EvaluacionPreliminar::class);
    }

    public function investigacion()
    {
        return $this->hasOne(Investigacion::class);
    }

    public function resolucion()
    {
        return $this->hasOne(Resolucion::class);
    }

    public function seguimiento()
    {
        return $this->hasOne(Seguimiento::class);
    }
}