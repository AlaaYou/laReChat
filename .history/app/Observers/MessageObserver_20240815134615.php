<?php

namespace App\Observers;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;


class MessageObserver
{
    public function deleting(Message $message){
        $message->attachments->each(function ($attachment) {
            $path = $attachment->path;
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                $dir = dirname($path);
                if (Storage::disk('public')->files($dir) === []) {
                    Storage::disk('public')->deleteDirectory($dir);
                }
            }
        });

        $message->attachments()->delete();

        if($message->group_id){
            $group = Group::where('last_message_id',$message->id)-> first();

            if($group){
                $prevMessage= Message::where('group_id',$message->group_id)
                    ->where('id', '!=', $message->id)
                    ->latest()
                    ->limit(1)
                    ->first();
                    
                if ($prevMessage){
                    $group->last_message_id = $prevMessage -> id;
                    $group->save();
                }
            }
        }else{
            $conversation = Conversation::where('latest_message_id',$message->id)->first();

            if($conversation){
                $prevMessage= Message::where(function ($query) use ($message){
                    $query->where('sender_id',$message->sender_id)
                        ->where('receiver_id',$message->receiver_id)
                        ->orWhere('sender_id',$message->receiver_id)
                        ->where('receiver_id',$message->sender_id);
                })
                    ->where('id', '!=', $message->id)
                    ->latest()
                    ->limit(1);

                if($prevMessage){
                    $conversation->last_message_id = $prevMessage->id;
                    $conversation->save();
                }
            }
        }
    }
}
