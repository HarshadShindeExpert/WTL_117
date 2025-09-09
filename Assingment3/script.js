async function getUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=6');
        const data = await response.json();
        const users = data.results;

        const container = document.getElementById('user-container');
        container.innerHTML = ''; // Clear old users

        users.forEach(user => {
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const picture = user.picture.large;
            const country = user.location.country;

            // Create card
            const card = document.createElement('div');
            card.className = 'user-card';

            const img = document.createElement('img');
            img.src = picture;
            img.alt = name;
            img.width = 100;
            img.height = 100;

            const info = document.createElement('div');
            info.innerHTML = `<h3>${name}</h3>
                              <p>${email}</p>
                              <p>📍 ${country}</p>`;

            card.appendChild(img);
            card.appendChild(info);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
