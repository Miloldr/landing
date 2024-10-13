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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        try {
            const client_id = '1281634718282027050';
            const client_secret = 'rqn_GIlF_m38KLoB06XuosD8hRrk_9LP';
            const redirect_uri = 'http://localhost:3000/link/';

            const res = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    client_id,
                    client_secret,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri
                })
            });

            const data = await res.json();
            const token = data.access_token;

            if (token) {
                const userRes = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userData = await userRes.json();
                const userId = userData.id;

                if (localStorage.getItem('discord_user_id') != userId) {
                    localStorage.setItem('discord_user_id', userId);
                    console.log('User ID stored:', userId);
                    sendApiRequest(userId)
                    location.href = 'https://land-ashen.vercel.app/receive'
                } else {
                    location.href = 'https://land-ashen.vercel.app/'
                }
            }
        } catch (err) {
            console.error('Error during OAuth process:', err);
        }
    }
};