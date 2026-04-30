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
        Schema::create('escrow_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('legal_case_id')->constrained()->onDelete('cascade');
            $table->foreignId('payer_id')->constrained('users')->comment('Citizen');
            $table->foreignId('payee_id')->constrained('users')->comment('Lawyer');
            $table->decimal('amount', 10, 2);
            $table->string('milestone_description');
            $table->enum('status', ['holding', 'released', 'disputed', 'refunded'])->default('holding');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('escrow_transactions');
    }
};
