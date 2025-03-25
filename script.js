// Check if the browser supports geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    document.getElementById("status").innerHTML = "Geolocation is not supported by this browser.";
}

// Function to handle successful location retrieval
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Fetch location name using Nominatim reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            // Extract city, town, or country from the response
            const location = data.address.city || data.address.town || data.address.country;
            document.getElementById("greeting").innerHTML = `Hello from ${location}!`;
            document.getElementById("status").innerHTML = ""; // Clear status message
        })
        .catch(error => {
            document.getElementById("status").innerHTML = "Unable to retrieve location data.";
        });
}

// Function to handle errors or permission denial
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerHTML = "Location access denied. Please enable it for a personalized greeting.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerHTML = "The request to get location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("status").innerHTML = "An unknown error occurred.";
            break;
    }
}