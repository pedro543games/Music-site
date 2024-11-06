const Users = [
    {
        User: 'Pedro',
        Password: 'pedro123'
    },
    {
        User: 'zezin',
        Password: 'Dog'
    },
    {
        User: 'admin',
        Password: 'admin'
    },
    {
        User: 'Filipe',
        Password: 'filipe123'
    }
]

let Button = document.getElementById('btnLogin')

Button.addEventListener('click', function logging(){
    let GetUser = document.getElementById('user').value
    let GetPassword = document.getElementById('password').value
    let Login = false

    if (GetUser == "" && GetPassword == "" ) { return }

    for (let i in Users) {
        if (GetUser == Users[i].User && GetPassword == Users[i].Password) {
            Login = true
            break
        }
    }

    if (Login == true){
        localStorage.setItem('UserName', GetUser);
        window.location.href = './index.html'
    } else {
        alert('erro')
    }
})
