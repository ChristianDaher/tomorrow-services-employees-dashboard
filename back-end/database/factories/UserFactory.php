<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'status' => $this->faker->boolean(),
            'name' => $this->faker->name(),
            'age' => $this->faker->numberBetween(16, 100),
            'position' => $this->faker->company(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'date' => $this->faker->dateTimeBetween('-2years', '+1week'),
            'admin' => $this->faker->boolean(),
            'password' => $this->faker->password(),
            'remember_token' => Str::random(10),
        ];
    }
}
