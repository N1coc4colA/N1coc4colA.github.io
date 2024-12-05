const channel = new BroadcastChannel('sync_channel');

document.getElementById('setTrue').addEventListener('click', function() {
    sessionStorage.setItem('sharedBoolean', 'true');
    channel.postMessage({ action: 'update', value: 'true' });
});

document.getElementById('setFalse').addEventListener('click', function() {
    sessionStorage.setItem('sharedBoolean', 'false');
    channel.postMessage({ action: 'update', value: 'false' });
});

document.getElementById('checkValue').addEventListener('click', function() {
    const value = sessionStorage.getItem('sharedBoolean');
    document.getElementById('result').textContent = `Current value: ${value}`;
});

// Listen for messages from other tabs
channel.onmessage = function(event) {
    if (event.data.action === 'update') {
        sessionStorage.setItem('sharedBoolean', event.data.value);
        document.getElementById('result').textContent = `Current value updated to: ${event.data.value}`;
    }
};
