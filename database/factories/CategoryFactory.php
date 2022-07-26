<?php

namespace Database\Factories;

use App\Models\Wish\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'color' => fake()->hexColor(),
            'name' => fake()->text(7),
            'user_id' => Auth::user()->id,
        ];
    }
}
