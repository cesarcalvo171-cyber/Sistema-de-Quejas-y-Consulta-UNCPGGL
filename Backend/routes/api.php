<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\InvestigacionController;
use App\Http\Controllers\ResolucionController;
use App\Http\Controllers\SeguimientoController;
use App\Http\Controllers\EvaluacionController;
use App\Http\Controllers\AuthController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/denuncias', [DenunciaController::class, 'store']);

// Revisor
Route::middleware(['auth:sanctum','rol:REVISOR'])->group(function () {
    Route::post('/evaluaciones', [EvaluacionController::class, 'store']);
    Route::get('/denuncias/{id}', [EvaluacionController::class, 'show']); // 👈 NUEVA
});
Route::middleware(['auth:sanctum','rol:REVISOR'])->group(function () {
    Route::get('/revisor/denuncias', [DenunciaController::class, 'denunciasParaRevisor']);
});
Route::middleware(['auth:sanctum','rol:REVISOR'])->get(
    '/revisor/denuncias/{id}',
    [DenunciaController::class, 'detalleDenuncia']
);

// Jefe área
Route::middleware(['auth:sanctum','rol:JEFE_AREA'])->group(function () {
    Route::post('/investigaciones', [InvestigacionController::class, 'store']);
    Route::post('/resoluciones', [ResolucionController::class, 'store']);
    Route::post('/seguimientos', [SeguimientoController::class, 'store']);
});