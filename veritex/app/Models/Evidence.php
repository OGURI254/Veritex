<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evidence extends Model
{
    use HasFactory;

    protected $fillable = [
        'legal_case_id',
        'uploaded_by',
        'file_name',
        'file_path',
        'mime_type',
        'sha256_hash',
    ];

    public function legalCase()
    {
        return $this->belongsTo(LegalCase::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
