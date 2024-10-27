const ws = new WebSocket('ws://localhost:3000'); // Establish WebSocket connection

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    document.addEventListener('DOMContentLoaded', function() {
        // Display the list of users and their initials
        const usersList = document.getElementById('users-list');
        if (usersList) {
            usersList.innerHTML = ''; // Clear previous user list

            data.users.forEach(user => {
                const userElement = document.createElement('p');
                userElement.textContent = `${user.name}: ${user.initials}`;
                usersList.appendChild(userElement);
            });
        }

        // Update the UI with the highest bid and bidder
        highestBidElement.textContent = `${data.highestBid}`;
        highestBidderElement.textContent = data.highestBidder;
        errorMessage.textContent = ''; // Clear any previous error messages
    });
};

function addInitials() {
    const name = document.getElementById('name').value;
    const initials = document.getElementById('initials').value;

    if (name && initials) {
        // Send the user's data to the server
        ws.send(JSON.stringify({ name, initials }));

        // Redirect to the users.html page after sending data
        window.location.href = 'users.html';
    } else {
        errorMessage.textContent = 'Please enter a valid name and initials.';
    }
}