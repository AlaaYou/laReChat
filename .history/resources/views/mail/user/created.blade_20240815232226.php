<x-mail::message>

    Hello {{ $user->name }},

    Your account has been created successfully.

    # Here is your login information

    Email: {{ $user->email }}
    Password: {{ $rawPassword }}

    Please login to the system and change your password.

    <x-mail::button url="{{ route('login') }}">
        Click here to login
    </x-mail::button>

    Thank you,
    {{ config('app.name', env('APP_NAME', 'Messenger ')) }}

</x-mail::message>
