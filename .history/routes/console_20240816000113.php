<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::middleware(['auth', 'verified','active'])->group(function (){
    Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])
        ->name('dashboard');
    Route::get('/user/{user}',[MessageController::class, 'byUser'])
        ->name('chat.user');
    Route::get('/group/{group}',[MessageController::class, 'byGroup'])
        ->name('chat.group');
    Route::post('/message', [MessageController::class, 'store'])
        ->name('message.store');
    Route::delete('/message/{message}', [MessageController::class, 'destroy'])
        ->name('message.destroy');
    Route::get('/message/older/{message}',[MessageController::class,'loadOlder'])
        ->name('message.loadOlder');

    Route::post('/group', [GroupController::class, 'store'])
        ->name('group.store');
    Route::put('/group/{group}', [GroupController::class, 'update'])
        ->name('group.update');
    Route::delete('/group/{group}', [GroupController::class, 'destroy'])
        ->name('group.destroy');

    Route::middleware(['admin'])->group(function (){
        Route::post('/user', [\App\Http\Controllers\UserController::class, 'store'])
            ->name('user.store');
        Route::post('/user/change-role/{user}', [\App\Http\Controllers\UserController::class, 'changeRole'])
            ->name('user.changeRole');
        Route::post('/user/block-unblock/{user}', [\App\Http\Controllers\UserController::class, 'blockUnblock'])
            ->name('user.blockUnblock');

    });
});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
