<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class CategoryController extends Controller
{

    public function loadCategories()



    {
        $categories = Category::where('tbl_category.is_deleted', false)->get();

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    public function getCategory($categoryId)
    {
        $category = Category::find($categoryId);

        return response()->json([
            'category' => $category
        ], 200);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'min:4', 'max:55']
        ]);

        Category::create([
            'category' => $validated['category']
        ]);

        return response()->json([
            'message' => 'Category Successfully Added.'
        ], 200);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category' => ['required', 'min:4', 'max:55']
        ]);

        $category->update([
            'category' => $validated['category']
        ]);

        return response()->json([
            'message' => 'Category Successfully Updated.'
        ], 200);
    }

    public function destroyCategory(Category $category)
    {
        $category->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Category Successfully Deleted.'
        ], 200);
    }
}
