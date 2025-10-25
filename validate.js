function validateForm() {
    const firstName = document.getElementById("firstName").value.trim(); 
    const lastName = document.getElementById("lastName").value.trim();
    const zipcode = document.getElementById("zipCode").value.trim();
    const messageEl = document.getElementById("message");

        messageEl.textContent = "";

   
    if (firstName.length < 2) {
        messageEl.textContent = "First name must be at least 2 characters.";
        return false; 
    }

        if (lastName.length < 2) {
        messageEl.textContent = "Last name must be at least 2 characters.";
        return false;
    }
        const zipPattern = /^[0-9]{5}$/;
    if (!zipPattern.test(zipCode)) {
        messageEl.textContent = "Zip code must be exactly 5 digits.";
        return false;
    }
    messageEl.style.color = "green"; 
    messageEl.textContent = `Access granted. Welcome, ${firstName} ${lastName}!`;

    return false;