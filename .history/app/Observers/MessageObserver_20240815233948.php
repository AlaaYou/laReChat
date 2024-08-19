<?php

namespace App\Observers;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;

class MessageObserver
{
    //when message is deleted
    public function deleting(Message $message)
    {
        //Iterate over message attachments and delete them from file system
        $message->attachments()->each(function ($attachment){
            $dir = dirname($attachment->path);
            Storage::disk('public')->deleteDirectory($dir);
        });

        //delete all attachments from database
        $message->attachments()->delete();

        //Update Group and conversation last message id if message was last_message
        if ($message->group_id){
            $group = Group::where('last_message_id', $message->id)->first();

            if($group){
                $prevMessage = Message::where('group_id', $message->group_id)
                    ->where('id', '!=', $message->id)
                    ->latest()
                    ->limit(1)
                    ->first();

                if($prevMessage){
                    $group->last_message_id = $prevMessage->id;
                    $group->save();
                }
            }
        } else {
            $conversation = Conversation::where('last_message_id', $message->id)->first();
            //if the message is the last message in the conversation
            if($conversation){
                $prevMessage = Message::where(function ($query) use ($message){
                    $query->where('sender_id', $message->sender_id)
                        ->where('receiver_id', $message->receiver_id)
                        ->orWhere('sender_id', $message->receiver_id)
                        ->where('receiver_id', $message->sender_id);
                })
                ->where('id', '!=', $message->id)
                ->latest()
                ->limit(1)
                ->first();

                if($prevMessage){
                    $conversation->last_message_id = $prevMessage->id;
                    $conversation->save();
                }
            }
        }
    }
}
