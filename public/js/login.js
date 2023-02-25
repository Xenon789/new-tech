const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-input').value;
    const password = document.querySelector('#password-input').value;

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Login Failed. Please Try again!');
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginHandler);