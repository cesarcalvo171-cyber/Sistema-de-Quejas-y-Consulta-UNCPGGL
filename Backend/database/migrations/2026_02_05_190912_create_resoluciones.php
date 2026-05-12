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
       Schema::create('quejas.resoluciones', function (Blueprint $table) {
    $table->id();
    $table->foreignId('denuncia_id')->constrained('quejas.denuncias')->onDelete('cascade');
    $table->string('decision');
    $table->text('fundamento');
    $table->jsonb('medidas');
    $table->date('fecha_resolucion');
    $table->foreignId('resolutor_id')->constrained('users');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resoluciones');
    }
};
