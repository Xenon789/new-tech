const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup-input').value;
    const password = document.querySelector('#password-signup-input').value;

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
        alert('Sign up Failed. Please Try again!');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupHandler);