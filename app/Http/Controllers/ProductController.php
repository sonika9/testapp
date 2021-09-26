<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Factories\PaymentFactory;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
		$product = new Product;
		$product->name = $request->name;
		$product->description = $request->description;
		$product->price = $request->price;
		$product->category_id = $request->category_id;

		$image = $request->file('image');
		$imageName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME).'_'.time().'.'.$image->extension();
		$image->move(public_path('images/products'), $imageName);
		$product->image_path = $imageName;
		
		$product->save();
		return response()->json(['status' => $product ? 'success':'fail']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
		$product = Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
		$product = Product::find($id);
		$product->name = $request->name;
		$product->description = $request->description;
		$product->price = $request->price;
		$product->category_id = $request->category_id;
		if ( $image = $request->file('image') ) {
			$imageName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME).'_'.time().'.'.$image->extension();
			$image->move(public_path('images'), $imageName);
			$product->image_path = $imageName;
		}
		
		$updated = $product->save();
		return response()->json(['status' => $updated ? 'success':'fail']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
		$product = Product::find($id);
		$deleted = $product->delete();
		return response()->json(['status' => $deleted ? 'success':'fail']);
    }

	public function search(Request $request){
		$name = $request->product_name ?? '';
		$categoryId = $request->category_id ?? null;
		$products = Product::when($categoryId, function($query, $categoryId){
			return $query->where('category_id', $categoryId);
		})->where('name', 'like', '%'.$name.'%')
			->orderByDesc('created_at')
			->paginate(15);
		return response()->json(['products' => $products]);
	}

	public function checkout(Request $request){
		$status = 'fail';
		$message = '';
		if ( Auth::check() ) {
			/*Simulated payment process*/
			$paymentService = PaymentFactory::getService($request->payment_type);
			$response = $paymentService->process();
			$total = 0;
			foreach ($request->items as $productId) {
				$product = Product::find($productId);
				if ( $product ) {
					$total += $product->price;
				}
			}
			$transaction = new Transaction();
			$transaction->user_id = Auth::user()->id;
			$transaction->total = $total;
			$transaction->response = $response;
			$added = $transaction->save();
			if ( $added ) {
				$status = 'success';
				$message = 'Your transaction has been successfully!';
			}
		} else {
			$message = 'Please log in to proceed with this action.';
		}
		return response()->json(['status' => $status, 'message' => $message]);
	}
}
