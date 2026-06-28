<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Cucian extends Model
{
    protected $fillable = [
        'nama_pelanggan',
        'no_kendaraan',
        'jenis_layanan',
        'status',
        'foto',
    ];
}

