<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_suppliers', function (Blueprint $table) {
            $table->bigIncrements('supplier_id');
            $table->string('supplier_name', 100);
            $table->string('contact_person', 100)->nullable();
            $table->string('email', 100)->unique();
            $table->string('phone', 15)->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_suppliers');
    }
};
