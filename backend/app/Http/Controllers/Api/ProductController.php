<?php

namespace App\Http\Controllers\Api;

use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{


    public function loadProducts()
    {
         $products = Product::all();

    $lowStock = $products->filter(function ($product) {
        return $product->stock_quantity <= 5;
    })->map(function ($product) {
        return [
            'message' => 'Low stock warning'
        ];
    });
        return response()->json([
            'products' => $products,
            'low_stock_warnings' => $lowStock
        ], 200);
    }

    public function getBySupplier($supplierId)
    {
    $products = Product::where('supplier_id', $supplierId)->get();

    return response()->json($products);
    }

    public function getByCategory($categoryID)
    {
    $products = Product::where('category_id', $categoryID)->get();

    return response()->json($products);
    }


    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required',
            'sku' => 'nullable|string|max:50|unique:tbl_products,sku',
            'image_url' => 'nullable|string|max:255',
            'supplier_id' => 'required'
        ]);

        Product::create($validated);

        return response()->json([
            'message' => 'Product successfully added.'
        ], 201);
    }

public function updateProduct(Request $request, Product $product)
{
    $validated = $request->validate([
        'product_name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'stock_quantity' => 'required|integer|min:0',
        'category_id' => [
            'required',
            Rule::exists('tbl_category', 'category_id'),
        ],
        'sku' => 'nullable|string|max:50|unique:tbl_products,sku,' . $product->product_id . ',product_id',
        'image_url' => 'nullable|string|max:255',
        'supplier_id' => [
            'required',
            Rule::exists('tbl_suppliers', 'supplier_id'),
        ],
    ]);

    $product->update($validated);

    return response()->json([
        'message' => 'Product successfully updated.'
    ], 200);
}


    public function destroyProduct(Product $product)
    {
        $product->update(['is_deleted' => true]);

        return response()->json([
            'message' => 'Product successfully deleted.'
        ], 200);
    }
}
