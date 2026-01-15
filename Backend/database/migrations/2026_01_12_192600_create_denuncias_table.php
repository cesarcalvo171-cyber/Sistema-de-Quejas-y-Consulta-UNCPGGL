<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quejas.denuncias', function (Blueprint $table) {
            $table->id();

            // DATOS DEL DENUNCIANTE
            $table->string('Nombre_Completo', 100);
            $table->string('R_universitaria', 50);
            $table->string('otro_R_universitaria', 100)->nullable();

            $table->string('Area', 50);
            $table->string('Otro_area', 100)->nullable();

            $table->string('Telefono', 20);
            $table->string('Correo', 150);
            $table->string('Medio_Recepcion', 50);

            // DATOS DE LA DENUNCIA
            $table->string('Tipo_denuncia', 150);
            $table->string('otros_tipo_denuncia', 150)->nullable();
            $table->text('Descripcion');
            $table->date('fecha');

            // PERSONA O AREA
            $table->string('persona_involucrada', 20);
            $table->string('persona_nombre', 150)->nullable();
            $table->string('area_nombre', 150)->nullable();

            // EVIDENCIAS
            $table->string('Documentos')->nullable();
            $table->string('Imagenes')->nullable();
            $table->string('Video')->nullable();

            // METADATA
            $table->string('numeroRegistro')->unique();
            $table->string('estado')->default('Pendiente');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quejas.denuncias');
    }
};