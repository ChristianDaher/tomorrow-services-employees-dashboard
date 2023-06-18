<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'status',
        'name',
        'age',
        'position',
        'gender',
        'date',
        'password',
        'admin',
    ];
    
    protected $hidden = [
        'remember_token',
    ];
}
