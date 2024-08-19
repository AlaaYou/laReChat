<?php

namespace App\Http\Controllers;

use App\Mail\UserBlockUnblockedMail;
use App\Mail\UserCreatedMail;
use App\Mail\UserRoleChangedMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'is_admin' => ['boolean']
        ]);

        //raw Password
        $rawPassword = Str::random(8);
        $data['password']  = bcrypt($rawPassword);
        $data['email_verified_at'] = now();

        $user = User::create($data);

        Mail::to($user)->send(new UserCreatedMail($user, $rawPassword));

        return redirect()->back();
    }

    public function changeRole(User $user)
    {
        $user->update(['is_admin' => ! (bool) $user->is_admin]);

        $message = "User '". $user->name."' role was changed into ". ($user->is_admin ? '"Admin"' : '"Regular User"');

        Mail::to($user)->send(new UserRoleChangedMail($user));


        return response()->json(['message' => $message]);
    }

    public function blockUnblock(User $user)
    {
        if($user->blocked_at){
            $user->blocked_at = null;
            $message = 'User "'.$user->name.'" has been activated';
        }else{
            $user->blocked_at = now();
            $message = 'User "'.$user->name.'" account has been blocked';
        }
        $user->save();

        Mail::to($user)->send(new UserBlockUnblockedMail($user));


        return response()->json(['message' => $message]);
    }
}
