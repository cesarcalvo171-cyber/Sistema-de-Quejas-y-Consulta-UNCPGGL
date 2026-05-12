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
        Schema::create('quejas.investigaciones', function (Blueprint $table) {
    $table->id();
    $table->foreignId('denuncia_id')->constrained('quejas.denuncias')->onDelete('cascade');
    $table->text('equipo');
    $table->jsonb('metodologia');
    $table->text('hallazgos');
    $table->text('analisis');
    $table->text('conclusiones');
    $table->date('fecha_inicio');
    $table->date('fecha_cierre')->nullable();
    $table->foreignId('responsable_id')->constrained('users');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investigaciones');
    }
};
