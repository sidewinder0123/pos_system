<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{

    public function processCheckout(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:tbl_products,product_id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_type' => 'required|string',
            'discount' => 'nullable|numeric|min:0|max:100', // optional % discount
        ]);

        $totalAmount = 0;

        DB::beginTransaction();

        try {
            // Calculate total and reduce stock
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Not enough stock for product: {$product->product_name}");
                }

                $product->stock_quantity -= $item['quantity'];
                $product->save();

                $totalAmount += $product->price * $item['quantity'];
            }

            // Apply discount if provided
            $discountValue = $validated['discount'] ?? 0;
            $discountAmount = $totalAmount * ($discountValue / 100);
            $finalAmount = $totalAmount - $discountAmount;

            // Create Sale record with discount
            $sale = Sale::create([
                'total_amount' => $finalAmount,
                'discount' => $discountAmount,
                'payment_type' => $validated['payment_type'],
            ]);

            // Create SaleItem records
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);

                $sale->items()->create([
                    'product_id' => $product->product_id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Checkout successful',
                'sale_id' => $sale->sale_id,
                'discount' => $discountAmount,
                'total_amount' => $finalAmount,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Checkout failed: ' . $e->getMessage(),
            ], 400);
        }
    }
}
