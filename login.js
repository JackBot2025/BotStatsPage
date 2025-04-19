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

function countInvites(data, userId) {
  return Object.values(data).filter(u => u.invited_by === userId).length;
}

function loadData() {
  fetch("user_stats.json")
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#stats-table tbody");
      tbody.innerHTML = ""; // alte Daten löschen
      for (const [id, info] of Object.entries(data)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${id}</td>
          <td>${countInvites(data, id)}</td>
          <td>${info.bonus_count || 0}</td>
          <td>${info.normal_count || 0}</td>
          <td>${info.adult_count || 0}</td>
        `;
        tbody.appendChild(row);
      }
    })
    .catch(err => {
      alert("Fehler beim Laden der Datei user_stats.json");
    });
}
