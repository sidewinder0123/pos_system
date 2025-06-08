<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\api\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public auth routes
Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');  // This can be inside auth middleware but you had it here, so kept it
    Route::get('/user', 'user');       // Usually protected, but you had it public
});

// Protected routes - require authentication
Route::middleware('auth:sanctum')->group(function() {

    Route::controller(AuthController::class)->group(function() {
        Route::get('/user', 'user');
        Route::post('/logout', 'logout');
    });

    // Only admin routes
    Route::middleware('role:admin')->group(function () {

        Route::controller(RoleController::class)->group(function () {
            Route::get('/loadRoles', 'loadRoles');
            Route::get('/getRole/{roleId}', 'getRole');
            Route::post('/storeRole', 'storeRole');
            Route::put('/updateRole/{role}', 'updateRole');
            Route::put('/destroyRole/{role}', 'destroyRole');
        });

        Route::controller(UserController::class)->group(function () {
            Route::get('/loadUsers', 'loadUsers');
            Route::post('/storeUser', 'storeUser');
            Route::put('/updateUser/{user}', 'updateUser');
            Route::put('/destroyUser/{user}', 'destroyUser');

        });

    });

    // Admin and Manager Routes

    Route::middleware('role:admin,manager')->group(function () {

        Route::controller(ProductController::class)->group(function () {
            Route::post('/storeProduct', 'storeProduct');
            Route::get('/loadProducts', 'loadProducts');           // View all products      // Add product
            Route::put('/updateProduct/{product}', 'updateProduct'); // Update product
            Route::put('/destroyProduct/{product}', 'destroyProduct'); // Soft delete product
        });


        Route::controller(SupplierController::class)->group(function () {
            Route::post('/storeSupplier', 'storeSupplier');
            Route::put('/updateSupplier/{supplier}', 'updateSupplier');
            Route::get('/loadSuppliers', 'loadSuppliers');
            Route::put('/destroySupplier/{supplier}', 'destroySupplier');
        });

        Route::controller(CategoryController::class)->group(function () {
            Route::post('/storeCategory', 'storeCategory');
            Route::put('/updateCategory/{category}', 'updateCategory');
            Route::put('/updateCategory/{category}', 'updateCategory');
            Route::put('/destroyCategory+/{category}', 'destroyCategory');

        });


    });

    // Cashier access

    Route::middleware('role:admin, manager, cashier')->group(function () {

        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', [ProductController::class, 'index']);
            Route::get('/loadProducts', 'loadProducts');
            Route::get('/products/supplier/{supplierId}', [ProductController::class, 'getBySupplier']);
        });



    });






    Route::controller(CheckoutController::class)->group(function () {
        Route::post('/processCheckout', 'processCheckout');



    });

});


// For quick auth check, protected route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
