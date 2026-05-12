<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DenunciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'Nombre_Completo' => 'required|string|max:100',
            'R_universitaria' => 'required|string',
            'Area' => 'required|string',
            'Telefono' => 'required|string',
            'Correo' => 'required|email',
            'Medio_Recepcion' => 'required|string',
            'Tipo_denuncia' => 'required|string',
            'Descripcion' => 'required|string',
            'persona_nombre' => 'required|string',
            'fecha' => 'required|date',
            'persona_involucrada' => 'required|string',

            'Documentos' => 'nullable|file|mimes:pdf|max:5120',
            'Imagenes' => 'nullable|image|max:5120',
            'Video' => 'nullable|file|mimes:mp4,webm|max:51200',
        ];
    }
}
