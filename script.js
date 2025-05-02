function getCurrentET() {
    const now = new Date();
    const etTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    return etTime;
}

function getStatus() {
    const now = getCurrentET();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 100 + minutes;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[day];

    let status = "";
    if (day >= 1 && day <= 4) { // Monday–Thursday
        status = "No movies/TV. Games/radio allowed (1 hr, mod discretion).";
    } else if (day === 5) { // Friday
        if (time >= 1300 && time < 2400) {
            status = "Marathon rules: Movies allowed. Games/radio (1 hr).";
        } else if (time >= 2200 && time < 2400) {
            status = "Movies allowed (until 12:00). Poll after 2 films. Games/radio (1 hr).";
        } else {
            status = "No movies/TV. Games/radio allowed (1 hr).";
        }
    } else if (day === 6) { // Saturday
        if (time >= 2200 && time < 2400) {
            status = "2 TV episodes (finished series). No movies. Games/radio (1 hr, post-series).";
        } else {
            status = "No movies/TV. Games/radio allowed (1 hr).";
        }
    } else if (day === 0) { // Sunday
        if (time >= 800 && time < 1100) {
            status = "2 TV episodes (current series). No movies until post-series. Games/radio (1 hr, post-series).";
        } else if (time >= 1100 || time < 800) {
            status = "Movies allowed (post-series). Games/radio allowed (1 hr).";
        }
    }

    // Update DOM
    document.getElementById("current-day").textContent = currentDay;
    document.getElementById("current-time").textContent = now.toLocaleTimeString("en-US", { hour12: true });
    document.getElementById("current-allowed").textContent = status;
}

document.addEventListener("DOMContentLoaded", () => {
    getStatus();
    setInterval(getStatus, 60000); // Update every minute
});