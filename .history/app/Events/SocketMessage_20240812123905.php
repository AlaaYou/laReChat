<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;
use App\Http\Resources\MessageResource;

class SocketMessage implements ShouldBroadCastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Message $message)
    {
        //
    }

    public function broadcastWith():array
    {
        return[
            'message'=>new MessageResource($this->message),
            
        ]
        ;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {   
        $m=$this->message;
        $channels= [];

        if($m->group_id){
            $channels[]= new PrivateChannel('message.group.'. $m->group_id);
        } else{
            $channels[]= new PrivateChannel('message.user.'.collect([$m->sender_id,$m->receiver_id])->sort()->implode('-'));
        }

        return $channels;
    }
}
