<?php

namespace App\Models;

use App\Observers\MessageObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
#[ObservedBy([MessageObserver::class])]
class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
        'group_id',
    ];

    public function sender() : BelongsTo
    {
        return $this->belongsTo(User::class,'sender_id');
    }

    public function receiver() : BelongsTo
    {
        return $this->belongsTo(User::class,'receiver_id');
    }

    public function group() : BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    public function attachments()
    {
        return $this->hasMany(MessageAttachment::class);
    }
}
