<?php

namespace App\Models;

use CodeIgniter\Model;

class LaporanModel extends Model
{
    protected $table         = 'laporan';
    protected $primaryKey    = 'id';
    protected $useAutoIncrement = true;
    protected $returnType    = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = [
        'nama_pelapor', 'no_telp', 'email_pelapor',
        'kategori_id', 'judul_laporan', 'isi_laporan',
        'lokasi', 'gambar_bukti', 'status', 'catatan_admin',
    ];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
}