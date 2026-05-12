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
       Schema::create('quejas.medidas_correctivas', function (Blueprint $table) {
    $table->id();
    $table->foreignId('seguimiento_id')->constrained('quejas.seguimientos')->onDelete('cascade');
    $table->text('descripcion');
    $table->text('responsable');
    $table->date('fecha_prevista');
    $table->date('fecha_cumplimiento')->nullable();
    $table->string('estado');
    $table->text('observaciones')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medidas_correctivas');
    }
};
