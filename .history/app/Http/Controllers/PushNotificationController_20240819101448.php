<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PushNotificationController extends Controller
{
    public function store(Request $request)
    {
        // Validate and store the subscription data
        $subscription = $request->all(); // Save this data to your database or a file
        
        // Example: Save to a file (not recommended for production)
        Storage::disk('local')->put('subscriptions.json', json_encode($subscription));

        // Return a success response
        return response()->json(['message' => 'Subscription stored successfully']);
    }
}