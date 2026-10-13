<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (config('app.env') !== 'local') {
            URL::forceScheme('https');
        }

        // Dynamically fix the hot file in local Docker environment
        if (file_exists(public_path('hot'))) {
            $hotContent = @file_get_contents(public_path('hot'));
            if ($hotContent && str_contains($hotContent, '0.0.0.0')) {
                @file_put_contents(public_path('hot'), str_replace('0.0.0.0', '127.0.0.1', $hotContent));
            }
        }
    }
}
