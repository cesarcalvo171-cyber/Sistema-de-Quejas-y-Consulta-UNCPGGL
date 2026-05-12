<?php 

namespace App\Http\Services\Denuncia;

use App\Models\Denuncia;
use Ramsey\Collection\Collection;

class DenunciaBuilder{

    protected Denuncia $denuncia; 
    protected Collection $evidencias;


    public function setDenuncia(mixed $data, ?Denuncia $denuncia = null){
        if(!$denuncia) $denuncia = new Denuncia();
        $denuncia->Nombre_Completo = $data['Nombre_completo'];
        $denuncia->R_universitaria = $data['R_universitaria'];
        $denuncia->otro_R_universitaria = $data['otro_R_universitaria'];
        $denuncia->Area = $data['Area'];
        $denuncia->Otro_area = $data['Otro_area'];
        $denuncia->Telefono = $data['Telefono'];
        $denuncia->Correo = $data['Correo'];
        $denuncia->Medio_Recepcion = $data['Medio_Recepcion'];
        $denuncia->Tipo_denuncia = $data['Tipo_denuncia'];
        $denuncia->otros_tipo_denuncia = $data['otros_tipo_denuncia'];
        $denuncia->Descripcion = $data['Descripcion'];
        $denuncia->fecha = $data['fecha'];
        $denuncia->persona_involucrada = $data['persona_involucrada'];
        $denuncia->persona_nombre = $data['persona_nombre'];
        $denuncia->area_nombre = $data['area_nombre'];
        $denuncia->numeroregistro = $data['numeroregistro'];
        $denuncia->estado = $data['estado'];

        }


}

