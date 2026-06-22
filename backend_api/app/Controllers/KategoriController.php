<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class KategoriController extends ResourceController
{
    protected $format    = 'json';
    protected $modelName = 'App\Models\KategoriModel';

    public function index()
    {
        $data = $this->model->orderBy('id', 'ASC')->findAll();
        return $this->respond(['status' => 200, 'message' => 'Data kategori berhasil diambil.', 'data' => $data], 200);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) return $this->respond(['status' => 404, 'message' => 'Kategori tidak ditemukan.'], 404);
        return $this->respond(['status' => 200, 'data' => $data], 200);
    }

    public function create()
    {
        $rules = [
            'nama_kategori' => 'required|min_length[3]|max_length[100]',
            'deskripsi'     => 'permit_empty|max_length[500]',
        ];

        if (!$this->validate($rules)) {
            return $this->respond(['status' => 422, 'message' => $this->validator->getErrors()], 422);
        }

        $data = [
            'nama_kategori' => $this->request->getVar('nama_kategori'),
            'deskripsi'     => $this->request->getVar('deskripsi'),
        ];
        $this->model->insert($data);

        return $this->respond(['status' => 201, 'message' => 'Kategori berhasil ditambahkan.', 'data' => $data], 201);
    }

    public function update($id = null)
    {
        $existing = $this->model->find($id);
        if (!$existing) return $this->respond(['status' => 404, 'message' => 'Kategori tidak ditemukan.'], 404);

        $input = $this->request->getJSON(true) ?? $this->request->getRawInput();

        $rules = [
            'nama_kategori' => 'required|min_length[3]|max_length[100]',
            'deskripsi'     => 'permit_empty|max_length[500]',
        ];

        if (!$this->validateData($input, $rules)) {
            return $this->respond(['status' => 422, 'message' => $this->validator->getErrors()], 422);
        }

        $data = [
            'nama_kategori' => $input['nama_kategori'] ?? $existing['nama_kategori'],
            'deskripsi'     => $input['deskripsi']     ?? $existing['deskripsi'],
        ];
        $this->model->update($id, $data);

        return $this->respond(['status' => 200, 'message' => 'Kategori berhasil diperbarui.', 'data' => $data], 200);
    }

    public function delete($id = null)
    {
        $existing = $this->model->find($id);
        if (!$existing) return $this->respond(['status' => 404, 'message' => 'Kategori tidak ditemukan.'], 404);

        $this->model->delete($id);
        return $this->respond(['status' => 200, 'message' => 'Kategori berhasil dihapus.'], 200);
    }
}