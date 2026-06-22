<?php

namespace Config;

use App\Filters\AuthFilter;
use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\Cors;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\SecureHeaders;

class Filters extends BaseConfig
{
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'auth'          => AuthFilter::class,
        'cors'          => Cors::class,
    ];

    public array $globals = [
        'before' => [
            'cors',
            // 'csrf' => ['except' => 'api/*'],
        ],
        'after' => [
            'toolbar',
            'cors',
        ],
    ];

    public array $methods = [];

    public array $filters = [];
}
