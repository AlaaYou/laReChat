<?php

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});

Broadcast::channel('online', function (User $user) {
    return  $user ? new UserResource($user) : null;
});

//individual message channel
Broadcast::channel('message.user.{user_id_1}-{user_id_2}',
    function (User $user, int $user_id_1, int $user_id_2){
    return $user->id === $user_id_1 || $user->id === $user_id_2 ? $user : null;
});

Broadcast::channel('message.group.{groupId}', function (User $user, int $groupId){
        return $user->groups->contains('id', $groupId) ? $user : null;
});

Broadcast::channel('group.deleted.{groupId}', function (User $user, int $groupId){
    return $user->groups->contains('id', $groupId);
});
