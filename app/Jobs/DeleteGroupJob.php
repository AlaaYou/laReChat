<?php

namespace App\Jobs;

use App\Events\GroupDeletedEvent;
use App\Models\Group;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteGroupJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Group $group)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $id = $this->group->id;
        $name = $this->group->name;

        $this->group->last_message_id = null;
        $this->group->save();

        //Iterate over all messages and delete them
        $this->group->messages->each->delete();

        //Remove all users
        $this->group->users()->detach();

        //Delete group
        $this->group->delete();

        //Dispatch notifications
        GroupDeletedEvent::dispatch($id, $name);
    }
}