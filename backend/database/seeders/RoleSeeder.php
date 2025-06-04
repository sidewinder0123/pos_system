<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run()
    {

        DB::table('tbl_roles')->delete();

        DB::table('tbl_roles')->insert([
            ['role_id' => 1, 'role' => 'admin'],
            ['role_id' => 2, 'role' => 'manager'],
            ['role_id' => 3, 'role' => 'cashier'],
        ]);
    }
}
