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
    Schema::table('quejas.denuncias', function (Blueprint $table) {

        // Nuevos campos correctos del modelo
        $table->text('lugar_hechos')->nullable()->after('Descripcion');
        $table->text('involucrados')->nullable()->after('lugar_hechos');
        $table->timestamp('fecha_recepcion')->nullable()->after('fecha');

        // Cambiamos el estado real del proceso
        $table->string('estado')->default('NUEVA')->change();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
