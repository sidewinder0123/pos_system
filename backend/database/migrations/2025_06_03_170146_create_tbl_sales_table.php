<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tbl_sales', function (Blueprint $table) {
            $table->id('sale_id'); // uses 'id' as the primary key
            $table->decimal('total_amount', 10, 2);
            $table->string('payment_type');
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('tbl_sales');
    }
};
