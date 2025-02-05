 const players = [
  {
    name: "Kashika",
    admissionNumber: "PF0125",
    admissionDate: "2023-08-07",
    feesStatus: "pending",
    dueDate: "2025-02-07",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
      { month: "Jan", year: 2025, status: "paid" },
    ],
  },
  {
    name: "Vihaan",
    admissionNumber: "PF0225",
    admissionDate: "2024-01-01",
    feesStatus: "pending",
    dueDate: "2025-02-01",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
     { month: "Jan", year: 2025, status: "paid" },
     { month: "Feb", year: 2025, status: "paid" },
    ],
  },
  {
    name: "Aryan",
    admissionNumber: "PF0325",
    admissionDate: "2024-01-01",
    feesStatus: "pending",
    dueDate: "2025-02-01",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
     { month: "Jan", year: 2025, status: "paid" },
      { month: "Feb", year: 2025, status: "paid" },
    ],
  },
  {
    name: "Blessy",
    admissionNumber: "PF0425",
    admissionDate: "2023-08-07",
    feesStatus: "pending",
    dueDate: "2025-02-07",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
      { month: "Jan", year: 2025, status: "paid" },
    ],
  },

  {
    name: "Chinmay",
    admissionNumber: "PF0525",
    admissionDate: "2024-10-07",
    feesStatus: "pending",
    dueDate: "2025-02-07",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
      { month: "Jan", year: 2025, status: "paid" },
    ],
  },

  {
    name: "Gurshabad",
    admissionNumber: "PF0625",
    admissionDate: "2024-07-21",
    feesStatus: "pending",
    dueDate: "2025-02-21",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
      { month: "Jan", year: 2025, status: "paid" },
    ],
  },
   {
    name: "Peehu",
    admissionNumber: "PF0725",
    admissionDate: "2025-01-14",
    feesStatus: "pending",
    dueDate: "2025-02-14",
    feesHistory: [
      { month: "Aug", year: 2024, status: "paid" },
      { month: "Sep", year: 2024, status: "paid" },
      { month: "Oct", year: 2024, status: "paid" },
      { month: "Nov", year: 2024, status: "paid" },
      { month: "Dec", year: 2024, status: "paid" },
      { month: "Jan", year: 2025, status: "paid" },
    ],
  },
  
];  








// Utility function to get the current month and year
function getCurrentMonthYear() {
  const now = new Date();
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    month: monthLabels[now.getMonth()],
    year: now.getFullYear(),
  };
}

// Prepare data for the graph
function getCurrentMonthData() {
  const { month, year } = getCurrentMonthYear();
  return players.reduce(
    (data, player) => {
      player.feesHistory.forEach((fee) => {
        if (fee.month === month && fee.year === year) {
          if (fee.status === "paid") {
            data.paid++;
          } else {
            data.pending++;
          }
        }
      });
      return data;
    },
    { paid: 0, pending: 0 }
  );
}

// Initialize Chart.js Graph
let feesChart;
function renderGraph() {
  const ctx = document.getElementById("feesTrendChart").getContext("2d");
  const { paid, pending } = getCurrentMonthData();
  const { month, year } = getCurrentMonthYear();

  if (feesChart) feesChart.destroy(); // Destroy previous chart to avoid duplication

  feesChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Paid", "Pending"],
      datasets: [
        {
          label: `Fees Status for ${month} ${year}`,
          data: [paid, pending],
          backgroundColor: ["#4caf50", "#f44336"],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Automatically refresh graph on month change
let lastMonth = getCurrentMonthYear().month;
setInterval(() => {
  const currentMonth = getCurrentMonthYear().month;
  if (currentMonth !== lastMonth) {
    lastMonth = currentMonth;
    renderGraph();
  }
}, 1000 * 60 * 60); // Check every hour

// Search players by name
function searchPlayers() {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchValue)
  );
  renderPlayers(filteredPlayers);
}



// Render player cards dynamically
function renderPlayers(filteredPlayers) {
  const playerList = document.getElementById("player-list");
  playerList.innerHTML = ""; // Clear the player list

  if (filteredPlayers.length === 0) {
    playerList.innerHTML = `<p>No players found.</p>`;
    return;
  }

  filteredPlayers.forEach((player) => {
    const card = document.createElement("div");
    card.className = `player-card ${player.feesStatus}`;
    card.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>Admission No:</strong> ${player.admissionNumber}</p>
      <button class="btn" onclick="redirectToDetails('${player.admissionNumber}')">Details</button>
    `;
    playerList.appendChild(card);
  });
}

// Redirect to details page
function redirectToDetails(admissionNumber) {
  const url = `player-details.html?admissionNumber=${encodeURIComponent(admissionNumber)}`;
  window.location.href = url; // Navigate to player-details.html
}

// Populate all players on load
function populatePlayers() {
  renderPlayers(players);
}

// Initialize the application after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Populate players on page load
  populatePlayers();

  // Attach search and filter functionality to buttons
  const searchBar = document.getElementById("searchBar");
  const filterPending = document.getElementById("filterPending");
  const filterPaid = document.getElementById("filterPaid");

  if (searchBar) searchBar.addEventListener("input", searchPlayers);
  if (filterPending) filterPending.addEventListener("click", () => filterByStatus("pending"));
  if (filterPaid) filterPaid.addEventListener("click", () => filterByStatus("paid"));
});





/* Alert popup */

/* Popup */

document.addEventListener("DOMContentLoaded", function () {
  // Show the modal after 3 seconds
  setTimeout(function () {
    document.getElementById('popupModal').classList.add('show');
  }, 2000);

  // Close modal when clicking the cross button
  document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('popupModal').classList.remove('show');
  });

  // Optional: Close modal when clicking outside the content
  window.addEventListener('click', function (e) {
    if (e.target == document.getElementById('popupModal')) {
      document.getElementById('popupModal').classList.remove('show');
    }
  });
});
