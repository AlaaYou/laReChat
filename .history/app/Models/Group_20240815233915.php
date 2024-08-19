<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'is_private',
        'is_active',
        'last_message_id'
    ];

    public function users() : BelongsToMany
    {
        return  $this->belongsToMany(User::class, 'group_users');
    }

    public function messages() : HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function owner() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function lastMessage() : BelongsTo
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }
    public static function getGroupsForUser(User $user)
    {
        $query = self::select(['groups.*', 'messages.message as last_message', 'messages.created_at as last
        _message_date'])
            ->join('group_users', 'group_users.group_id', '=', 'groups.id')
            ->leftJoin('messages', 'messages.id', '=', 'groups.last_message_id')
            ->where('group_users.user_id', $user->id)
            ->orderBy('messages.created_at', 'desc')
            ->orderBy('groups.name');

        return $query->get();
    }

    public function toConversationArray()
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'description'   => $this->description,
            'is_group'      => true,
            'is_user'       => false,
            'owner_id'      => $this->owner_id,
            'users'         => $this->users,
            'user_ids'      => $this->users->pluck('id'),
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
            'last_message'  => $this->last_message,
            'last_message_date'  => $this->last_message_date ? ($this->last_message_date) : null
        ];
    }

    public static function updateGroupWithMessage($groupId, $message)
    {
        //create or update group with received group id and message
        return self::updateOrCreate(
            ['id' => $groupId],
            ['last_message_id' => $message->id]
        );
    }
}
