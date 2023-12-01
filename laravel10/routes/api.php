<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrderDetailsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('App\Http\Controllers')->group(function(){
    Route::post('register-user', [UserController::class, 'registerUser']);
    Route::post('login-user', [UserController::class, 'loginUser']);
    Route::post('login-google', [UserController::class, 'loginGoogle']);
    Route::post('logout-user', [UserController::class, 'logoutUser']);
    Route::post('get-users', [UserController::class, 'getUsers']);
    Route::post('update-user', [UserController::class, 'updateUser']);
    // Route::post('images', [UserController::class, 'uploadImg']);

    Route::post('get-categories', [CategoriesController::class, 'getCategories']);
    Route::post('load-products-in-category', [CategoriesController::class, 'loadProductsInCategory']);

    Route::post('get-brands', [BrandController::class, 'getBrands']);
    Route::post('load-products-in-brand', [BrandController::class, 'loadProductsInBrand']);

    Route::post('get-products', [ProductController::class, 'getProducts']);
    Route::post('get-product-inf', [ProductController::class, 'getProductInf']);

    Route::post('get-addresses', [AddressController::class, 'getAddresses']);
    Route::post('add-new-address', [AddressController::class, 'addNewAddress']);
    Route::post('update-address', [AddressController::class, 'updateAddress']);
    Route::post('delete-address', [AddressController::class, 'deleteAddress']);

    Route::post('get-reviews', [ReviewController::class, 'getReviews']);
    Route::post('add-new-review', [ReviewController::class, 'addNewReview']);

    Route::post('get-cart', [CartController::class, 'getProductsInCart']);
    Route::post('add-to-cart', [CartController::class, 'addToCart']);
    Route::post('remove-to-cart', [CartController::class, 'removeToCart']);
    Route::post('update-to-cart', [CartController::class, 'updateToCart']);
    Route::post('clear-cart', [CartController::class, 'clearCart']);

    Route::post('get-favs', [FavouriteController::class, 'getProductsInFavs']);
    Route::post('add-to-favs', [FavouriteController::class, 'addToFavs']);
    Route::post('check-faved', [FavouriteController::class, 'checkFaved']);
    Route::post('remove-from-favs', [FavouriteController::class, 'removeFromFavs']);

    Route::post('get-orders', [OrderController::class, 'getOrders']);
    Route::post('create-order', [OrderController::class, 'createOrder']);
    Route::post('update-order-status', [OrderController::class, 'updateOrderStatus']);
    Route::post('update-payment-status', [OrderController::class, 'updatePaymentStatus']);

    Route::post('create-order-details', [OrderDetailsController::class, 'createOrderDetails']);

    Route::group(['middleware' => ['auth:sanctum']], function(){
        Route::post('get-user', [UserController::class, 'getUser']);
    });
});

