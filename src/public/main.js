const PUBLIC_VAPID_KEY='BCRoqRI1c0_LywfOjdevb3AF8haljVqlCOk5elOYyTlJvH511LeY0vjXPyJ9_T87EWGqpqZQgz7gnNs_FWsigfE'

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async() => {

    //service workder
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });    

    
    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log('Subscribed!')
}

const form = document.querySelector('#myForm');
const message = document.querySelector('#message');

form.addEventListener('submit', e=>{
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    form.reset();
})

subscription();