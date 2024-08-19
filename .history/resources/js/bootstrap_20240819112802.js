import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: window.pusher_key,
    cluster: window.pusher_cluster,
    forceTLS: true,
});