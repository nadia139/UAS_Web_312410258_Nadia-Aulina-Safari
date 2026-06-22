<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class StatsController extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $terbaru = $db->table('laporan l')
            ->select('l.id, l.nama_pelapor, l.judul_laporan, l.status, l.created_at, k.nama_kategori')
            ->join('kategori_aduan k', 'k.id = l.kategori_id', 'left')
            ->orderBy('l.created_at', 'DESC')
            ->limit(5)
            ->get()->getResultArray();

        return $this->respond([
            'status'  => 200,
            'message' => 'Statistik berhasil diambil.',
            'data'    => [
                'total_laporan'   => $db->table('laporan')->countAll(),
                'total_kategori'  => $db->table('kategori_aduan')->countAll(),
                'menunggu'        => $db->table('laporan')->where('status', 'menunggu')->countAllResults(),
                'diproses'        => $db->table('laporan')->where('status', 'diproses')->countAllResults(),
                'selesai'         => $db->table('laporan')->where('status', 'selesai')->countAllResults(),
                'ditolak'         => $db->table('laporan')->where('status', 'ditolak')->countAllResults(),
                'laporan_terbaru' => $terbaru,
            ],
        ], 200);
    }
}