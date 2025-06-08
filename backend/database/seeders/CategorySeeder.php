<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {

        DB::table('tbl_category')->delete();

        DB::table('tbl_category')->insert([
            ['category_id' => 1, 'category' => 'School Supplies'],
            ['category_id' => 2, 'category' => 'Food and Beverages'],
            ['catgeory_id' => 3, 'category' => 'Apparrel'],
            ['category_id' => 4, 'category' => 'Electronics'],
            ['category_id' => 5, 'category' => 'Sports and Fitness'],
            ['category_id' => 6, 'category' => 'Health and Beauty'],
            ['category_id' => 7, 'category' => 'Home and Living'],
            ['category_id' => 8, 'category' => 'Toys and Games'],
            ['category_id' => 9, 'category' => 'Automotive'],
            ['category_id' => 10, 'category' => 'Books and Stationery'],
        ]);
    }
}
