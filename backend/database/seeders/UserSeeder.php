<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Make sure roles exist, especially role_id 1, 2, 3
        DB::table('tbl_users')->delete(); // Delete all existing users

        DB::table('tbl_users')->insert([
            [
                'first_name' => 'Admin',
                'middle_name' => 'A.',
                'last_name' => 'User',
                'role_id' => 1,  // admin role_id, must exist in tbl_roles
                'email' => 'admin@sample.com',
                'password' => Hash::make('password123'), // hashed password
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Manager',
                'middle_name' => 'B.',
                'last_name' => 'User',
                'role_id' => 2,  // manager role_id
                'email' => 'manager@sample.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Cashier',
                'middle_name' => 'C.',
                'last_name' => 'User',
                'role_id' => 3,  // cashier role_id
                'email' => 'cashier@sample.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
