<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegalCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_number',
        'title',
        'description',
        'citizen_id',
        'lawyer_id',
        'court_name',
        'status',
    ];

    public function citizen()
    {
        return $this->belongsTo(User::class, 'citizen_id');
    }

    public function lawyer()
    {
        return $this->belongsTo(User::class, 'lawyer_id');
    }

    public function evidence()
    {
        return $this->hasMany(Evidence::class);
    }

    public function escrowTransactions()
    {
        return $this->hasMany(EscrowTransaction::class);
    }
}
