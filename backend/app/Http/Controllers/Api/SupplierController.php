<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Supplier;

class SupplierController extends Controller
{
    public function storeSupplier(Request $request)
    {
        $validated = $request->validate([
            'supplier_name' => ['required', 'string', 'max:255'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:15'],
            'address' => ['nullable', 'string']
        ]);

        Supplier::create($validated);

        return response()->json([
            'message' => 'Supplier successfully added.'
        ], 201);
    }

    public function updateSupplier(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'supplier_name' => ['required', 'string', 'max:255'],
            'contact_person' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('tbl_suppliers', 'email')->ignore($supplier->supplier_id, 'supplier_id')
            ],
            'phone' => ['nullable', 'string', 'max:15'],
            'address' => ['nullable', 'string']
        ]);

        $supplier->update($validated);

        return response()->json([
            'message' => 'Supplier successfully updated.'
        ], 200);
    }

    public function destroySupplier(Supplier $supplier)
    {
        $supplier->update(['is_deleted' => true]);

        return response()->json([
            'message' => 'Supplier successfully deleted.'
        ], 200);
    }

    // ✅ Load suppliers method
    public function loadSuppliers()
    {
        $suppliers = Supplier::all();
        return response()->json(['suppliers' => $suppliers], 200);
    }
}
