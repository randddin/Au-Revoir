function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Contoh validasi sederhana
    if (username === 'rara' && password === 'password') {
        window.location.href = '../index.html';
    } else {
        alert('Login gagal. Silakan coba lagi.');
    }
}