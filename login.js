
const allowedUsername = "admin";
const allowedPassword = "admin123";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === allowedUsername && pass === allowedPassword) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("stats-box").style.display = "block";
    loadData();
  } else {
    document.getElementById("login-error").innerText = "Falscher Benutzername oder Passwort!";
  }
}

function loadData() {
  fetch("user_data.json")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#stats-table tbody");
      for (const [id, info] of Object.entries(data)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${id}</td>
          <td>${info.referrals}</td>
          <td>${info.bonus_images}</td>
          <td>${info.daily_normal}</td>
          <td>${info.daily_adult}</td>
        `;
        tbody.appendChild(row);
      }
    })
    .catch(err => {
      alert("Fehler beim Laden der Datei user_data.json");
    });
}
