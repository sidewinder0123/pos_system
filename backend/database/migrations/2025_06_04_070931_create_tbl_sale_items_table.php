<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tbl_sale_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sale_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();

            $table->foreign('sale_id')->references('sale_id')->on('tbl_sales')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('tbl_products');
});

    }

    public function down()
    {
        Schema::dropIfExists('tbl_sale_items');
    }
};
