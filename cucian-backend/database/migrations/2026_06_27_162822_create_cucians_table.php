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
        Schema::create('cucians', function (Blueprint $table) {
        $table->id();
        $table->string('nama_pelanggan');
        $table->string('no_kendaraan');
        $table->string('jenis_layanan');
        $table->string('status')->default('Menunggu');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cucians');
    }
};
