<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->respond([
                'status'  => 422,
                'error'   => 'Validation Error',
                'message' => $this->validator->getErrors(),
            ], 422);
        }

        $db    = \Config\Database::connect();
        $email = $this->request->getVar('email');
        $pass  = $this->request->getVar('password');
        $user  = $db->table('users')->where('email', $email)->get()->getRowArray();

        if (!$user || !password_verify($pass, $user['password'])) {
            return $this->respond([
                'status'  => 401,
                'error'   => 'Unauthorized',
                'message' => 'Email atau password salah.',
            ], 401);
        }

        $token = bin2hex(random_bytes(32));
        $db->table('users')->where('id', $user['id'])->update(['token' => $token]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil.',
            'data'    => [
                'token' => $token,
                'nama'  => $user['nama'],
                'email' => $user['email'],
            ],
        ], 200);
    }

    public function logout()
    {
        $authHeader = $this->request->getHeaderLine('Authorization');
        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->respond(['status' => 400, 'message' => 'Token tidak ditemukan.'], 400);
        }

        $token = trim(substr($authHeader, 7));
        $db    = \Config\Database::connect();
        $db->table('users')->where('token', $token)->update(['token' => null]);

        return $this->respond(['status' => 200, 'message' => 'Logout berhasil.'], 200);
    }
}