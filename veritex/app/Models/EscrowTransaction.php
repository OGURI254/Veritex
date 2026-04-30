<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EscrowTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'legal_case_id',
        'payer_id',
        'payee_id',
        'amount',
        'milestone_description',
        'status',
    ];

    public function legalCase()
    {
        return $this->belongsTo(LegalCase::class);
    }

    public function payer()
    {
        return $this->belongsTo(User::class, 'payer_id');
    }

    public function payee()
    {
        return $this->belongsTo(User::class, 'payee_id');
    }
}
