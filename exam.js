document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.querySelector('#userTable tbody');
    const clearDataButton = document.getElementById('clearDataButton');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);

        if (age >= 18) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${age}</td>
            `;
            tableBody.appendChild(row);
            saveDataToLocalStorage(firstName, lastName, age);
        } else {
            alert('Age must be 18 or older to submit.');
        }

        form.reset();
    });

    clearDataButton.addEventListener('click', function() {
        tableBody.innerHTML = '';
        localStorage.clear();
        form.reset();
    });

    function saveDataToLocalStorage(firstName, lastName, age) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ firstName, lastName, age });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadDataFromLocalStorage() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadDataFromLocalStorage();
});
