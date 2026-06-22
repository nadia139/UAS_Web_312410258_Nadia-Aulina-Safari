<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class LaporanController extends ResourceController
{
    protected $format    = 'json';
    protected $modelName = 'App\Models\LaporanModel';

    // Folder upload diletakkan di dalam public/ agar bisa diakses langsung lewat URL browser
    private function uploadPath()
    {
        return FCPATH . 'uploads';
    }

    public function index()
    {
        $db   = \Config\Database::connect();
        $data = $db->table('laporan l')
            ->select('l.*, k.nama_kategori')
            ->join('kategori_aduan k', 'k.id = l.kategori_id', 'left')
            ->orderBy('l.id', 'ASC')
            ->get()->getResultArray();

        return $this->respond(['status' => 200, 'message' => 'Data laporan berhasil diambil.', 'data' => $data], 200);
    }

    public function show($id = null)
    {
        $db   = \Config\Database::connect();
        $data = $db->table('laporan l')
            ->select('l.*, k.nama_kategori')
            ->join('kategori_aduan k', 'k.id = l.kategori_id', 'left')
            ->where('l.id', $id)
            ->get()->getRowArray();

        if (!$data) return $this->respond(['status' => 404, 'message' => 'Laporan tidak ditemukan.'], 404);
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    public function create()
    {
        $rules = [
            'nama_pelapor'  => 'required|min_length[3]|max_length[100]',
            'kategori_id'   => 'required|integer',
            'judul_laporan' => 'required|min_length[5]|max_length[200]',
            'isi_laporan'   => 'required|min_length[10]',
            'status'        => 'permit_empty|in_list[menunggu,diproses,selesai,ditolak]',
        ];

        if (!$this->validate($rules)) {
            return $this->respond(['status' => 422, 'message' => $this->validator->getErrors()], 422);
        }

        $gambarNama = null;
        $gambar     = $this->request->getFile('gambar_bukti');
        if ($gambar && $gambar->isValid() && !$gambar->hasMoved()) {
            if (!is_dir($this->uploadPath())) {
                mkdir($this->uploadPath(), 0755, true);
            }
            $gambarNama = $gambar->getRandomName();
            $gambar->move($this->uploadPath(), $gambarNama);
        }

        $data = [
            'nama_pelapor'  => $this->request->getVar('nama_pelapor'),
            'no_telp'       => $this->request->getVar('no_telp'),
            'email_pelapor' => $this->request->getVar('email_pelapor'),
            'kategori_id'   => $this->request->getVar('kategori_id'),
            'judul_laporan' => $this->request->getVar('judul_laporan'),
            'isi_laporan'   => $this->request->getVar('isi_laporan'),
            'lokasi'        => $this->request->getVar('lokasi'),
            'gambar_bukti'  => $gambarNama,
            'status'        => $this->request->getVar('status') ?? 'menunggu',
            'catatan_admin' => $this->request->getVar('catatan_admin'),
        ];

        $this->model->insert($data);
        $insertId = $this->model->insertID();

        return $this->respond(['status' => 201, 'message' => 'Laporan berhasil ditambahkan.', 'data' => ['id' => $insertId] + $data], 201);
    }

    public function update($id = null)
    {
        $existing = $this->model->find($id);
        if (!$existing) return $this->respond(['status' => 404, 'message' => 'Laporan tidak ditemukan.'], 404);

        // Ambil input dari POST (multipart/form-data, mendukung file upload)
        $input = $this->request->getPost();

        $data = [
            'nama_pelapor'  => $input['nama_pelapor']  ?? $existing['nama_pelapor'],
            'no_telp'       => $input['no_telp']        ?? $existing['no_telp'],
            'email_pelapor' => $input['email_pelapor']  ?? $existing['email_pelapor'],
            'kategori_id'   => $input['kategori_id']    ?? $existing['kategori_id'],
            'judul_laporan' => $input['judul_laporan']  ?? $existing['judul_laporan'],
            'isi_laporan'   => $input['isi_laporan']    ?? $existing['isi_laporan'],
            'lokasi'        => $input['lokasi']         ?? $existing['lokasi'],
            'status'        => $input['status']         ?? $existing['status'],
            'catatan_admin' => $input['catatan_admin']  ?? $existing['catatan_admin'],
        ];

        // Proses upload gambar baru jika ada
        $gambar = $this->request->getFile('gambar_bukti');
        if ($gambar && $gambar->isValid() && !$gambar->hasMoved()) {
            // Hapus gambar lama jika ada
            if ($existing['gambar_bukti']) {
                $fileLama = $this->uploadPath() . '/' . $existing['gambar_bukti'];
                if (file_exists($fileLama)) unlink($fileLama);
            }
            if (!is_dir($this->uploadPath())) {
                mkdir($this->uploadPath(), 0755, true);
            }
            $gambarNama = $gambar->getRandomName();
            $gambar->move($this->uploadPath(), $gambarNama);
            $data['gambar_bukti'] = $gambarNama;
        }

        $this->model->update($id, $data);
        return $this->respond(['status' => 200, 'message' => 'Laporan berhasil diperbarui.', 'data' => $data], 200);
    }

    public function delete($id = null)
    {
        $existing = $this->model->find($id);
        if (!$existing) return $this->respond(['status' => 404, 'message' => 'Laporan tidak ditemukan.'], 404);

        if ($existing['gambar_bukti']) {
            $filePath = $this->uploadPath() . '/' . $existing['gambar_bukti'];
            if (file_exists($filePath)) unlink($filePath);
        }

        $this->model->delete($id);
        return $this->respond(['status' => 200, 'message' => 'Laporan berhasil dihapus.'], 200);
    }
}