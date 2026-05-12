<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\DB;

class DenunciaService
{
    public function crearNumeroRegistro()
    {
        $correlativo = DB::selectOne("SELECT nextval('quejas.seq_numero_queja') AS num")->num;
        $numero = 'SQC-'
            . str_pad($correlativo, 5, '0', STR_PAD_LEFT)
            . '-UNCPGGL';
        return $numero;
    }
}
