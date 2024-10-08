<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id1',
        'user_id2',
        'last_message_id'
    ];

    public function lastMessage() : BelongsTo
    {
        return $this->belongsTo(Message::class);
    }
    public function user1() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id1');
    }

    public function user2() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id2');
    }

    public static function getConversationForSidebar(User $exceptUser)
    {
        $users = User::getUsersExceptUser($exceptUser);
        $groups = Group::getGroupsForUser($exceptUser);

        return $users->map(function (User $user){
            return $user->toConversationArray();
        })->concat($groups->map(function (Group $group){
            return $group->toConversationArray();
        }));
    }

    public static function updateConversationWithMessage($user_id1, $user_id2, $message)
    {
        $conversation = Conversation::where(function ($query) use ($user_id1, $user_id2){
           $query->where('user_id1', $user_id1)
               ->where('user_id2', $user_id2);
        })
        ->orWhere(function ($query) use ($user_id1, $user_id2){
            $query->where('user_id1', $user_id2)
                ->where('user_id2', $user_id1);
        })->first();

        if($conversation){
            $conversation->update([
                'last_message_id' => $message->id
            ]);
        } else {
            Conversation::create([
                'user_id1' => $user_id1,
                'user_id2' => $user_id2,
                'last_message_id' => $message->id
            ]);
        }
    }
}
