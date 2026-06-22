<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

// Handle OPTIONS preflight (CORS)
$routes->options('(:any)', static function () {
    return response()->setStatusCode(200);
});

// Auth
$routes->post('api/auth/login',  'AuthController::login');
$routes->post('api/auth/logout', 'AuthController::logout');

// Kategori Aduan
$routes->get('api/kategori',                    'KategoriController::index');
$routes->get('api/kategori/(:num)',             'KategoriController::show/$1');
$routes->post('api/kategori/create',            'KategoriController::create',      ['filter' => 'auth']);
$routes->put('api/kategori/update/(:num)',      'KategoriController::update/$1',   ['filter' => 'auth']);
$routes->delete('api/kategori/delete/(:num)',   'KategoriController::delete/$1',   ['filter' => 'auth']);

// Laporan
$routes->get('api/laporan',                     'LaporanController::index');
$routes->get('api/laporan/(:num)',              'LaporanController::show/$1');
$routes->post('api/laporan/create',             'LaporanController::create',       ['filter' => 'auth']);
$routes->put('api/laporan/update/(:num)',       'LaporanController::update/$1',    ['filter' => 'auth']);
// POST update untuk mendukung upload file (PHP tidak membaca file dari PUT request)
$routes->post('api/laporan/update/(:num)',      'LaporanController::update/$1',    ['filter' => 'auth']);
$routes->delete('api/laporan/delete/(:num)',    'LaporanController::delete/$1',    ['filter' => 'auth']);

// Stats (publik)
$routes->get('api/stats', 'StatsController::index');