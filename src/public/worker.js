console.log('Servidor worker');

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log(data)
    self.registration.showNotification(
        data.title,
        {
            body: data.message,
            icon: 'https://toppng.com/uploads/preview/arch-linux-logo-arch-linux-11562915682mxfu99tp6t.png'
        })
    console.log('Notificacion')
})