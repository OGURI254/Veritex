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
        Schema::create('legal_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case_number')->unique()->nullable();
            $table->string('title');
            $table->text('description');
            $table->foreignId('citizen_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('lawyer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('court_name')->nullable();
            $table->enum('status', ['open', 'assigned', 'filed', 'in_court', 'closed', 'appealed'])->default('open');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_cases');
    }
};
