<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
            return response()
                ->setJSON([
                    'status'  => 401,
                    'error'   => 'Unauthorized',
                    'message' => 'Token tidak ditemukan. Harap login terlebih dahulu.',
                ])
                ->setStatusCode(401);
        }

        $token = trim(substr($authHeader, 7));
        $db    = \Config\Database::connect();
        $user  = $db->table('users')->where('token', $token)->get()->getRowArray();

        if (!$user) {
            return response()
                ->setJSON([
                    'status'  => 401,
                    'error'   => 'Unauthorized',
                    'message' => 'Token tidak valid atau sudah kadaluarsa.',
                ])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}