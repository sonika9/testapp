<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\ProductResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\TransactionResource;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;
use App\Models\Product;
use App\Models\Category;
use App\Models\Transaction;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/product/{id}', function ($id) {
    return new ProductResource(Product::findOrFail($id));
});
Route::get('/products', function () {
    return ProductResource::collection(Product::paginate());
});
Route::post('/user/register', [UserController::class, 'store']);
Route::post('/user/login', [UserController::class, 'login']);
Route::get('/user/isloggedin', [UserController::class, 'isLoggedIn']);
Route::get('/user/logout', [UserController::class, 'logout']);
Route::get('/categories', function () {
    return CategoryResource::collection(Category::all());
});
Route::middleware('auth:sanctum','roleauth')->post('/product/add', [ProductController::class, 'store']);
Route::middleware('auth:sanctum','roleauth')->post('/product/edit/{id}', [ProductController::class, 'update']);
Route::middleware('auth:sanctum','roleauth')->delete('/product/delete/{id}', [ProductController::class, 'destroy']);
Route::post('/product/checkout', [ProductController::class, 'checkout']);

Route::get('/products/search', [ProductController::class, 'search']);

Route::middleware('auth:sanctum','roleauth')->get('/transactions', function () {
    return TransactionResource::collection(Transaction::orderByDesc('created_at')->paginate(15));
});
