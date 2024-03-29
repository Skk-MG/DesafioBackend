const form = document.getElementById('resetPasswordForm');

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const data = new FormData(form)
    const payload = {}
    
    data.forEach((value, key) => {
        payload[key] = value;
    });

    fetch('/api/sessions/resetPassword', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {

        if(res.status == 200) {
            console.log('Restauracion de contraseña exitosa')
            
            setTimeout(() => {
                window.location.href = '/login'    
            }, 2000); 
        }
    })
})