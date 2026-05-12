<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quejas.evaluaciones_preliminares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('denuncia_id')->constrained('quejas.denuncias')->onDelete('cascade');
            $table->foreignId('evaluador_id')->constrained('users');
            $table->string('Resultado');
            $table->text('Observaciones');
            $table->timestamp('fecha');
            $table->string('tipo_Evaluacion_premilinar')->nullable();
            $table->string('Instancia_Receptora')->nullable();
            $table->text('Nombre_Participante')->nullable();
            $table->text('Cargo_Participante')->nullable();
            $table->text('Analisis')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluaciones_preliminares');
    }
};
