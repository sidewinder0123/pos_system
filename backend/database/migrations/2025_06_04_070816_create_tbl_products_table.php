<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('product_name', 255);
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock_quantity');
            $table->unsignedBigInteger('category_id');
            $table->string('sku', 50)->unique()->nullable();
            $table->string('image_url', 255)->nullable();
            $table->unsignedBigInteger('supplier_id');
            $table->boolean('is_deleted')->default(false);
            $table->timestamps(); // created_at and updated_at


            $table->foreign('category_id')
                ->references('category_id')
                ->on('tbl_category')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('supplier_id')
                ->references('supplier_id')
                ->on('tbl_suppliers')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_products');
    }
};
