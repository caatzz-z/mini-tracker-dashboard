const addBtn = document.getElementById("addBtn");
const itemInput = document.getElementById("itemInput");
const categorySelect = document.getElementById("categorySelect");
const itemList = document.getElementById("itemList");
const totalDisplay = document.getElementById("total");
const workTotalDisplay = document.getElementById("workTotal");
const studyTotalDisplay = document.getElementById("studyTotal");
const funTotalDisplay = document.getElementById("funTotal");
const modeToggle = document.getElementById("modeToggle");

let total = 0;
const categoryTotals = { Work: 0, Study: 0, Fun: 0 };

const ctx = document.getElementById("categoryChart").getContext("2d");
const categoryChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Work", "Study", "Fun"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#4e73df", "#1cc88a", "#f6c23e"],
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { position: "bottom" } } },
});

addBtn.addEventListener("click", () => {
  const points = parseFloat(itemInput.value);
  const category = categorySelect.value;
  if (!isNaN(points)) {
    total += points;
    categoryTotals[category] += points;

    const li = document.createElement("li");
    li.style.backgroundColor =
      categoryChart.data.datasets[0].backgroundColor[
        categoryChart.data.labels.indexOf(category)
      ];
    li.innerHTML = `${category}: ${points} <span class="delete">X</span>`;
    itemList.appendChild(li);
    totalDisplay.textContent = total;

    categoryChart.data.datasets[0].data = [
      categoryTotals.Work,
      categoryTotals.Study,
      categoryTotals.Fun,
    ];
    categoryChart.update();

    workTotalDisplay.textContent = categoryTotals.Work;
    studyTotalDisplay.textContent = categoryTotals.Study;
    funTotalDisplay.textContent = categoryTotals.Fun;

    itemInput.value = "";

    li.querySelector(".delete").addEventListener("click", () => {
      total -= points;
      categoryTotals[category] -= points;
      totalDisplay.textContent = total;

      categoryChart.data.datasets[0].data = [
        categoryTotals.Work,
        categoryTotals.Study,
        categoryTotals.Fun,
      ];
      categoryChart.update();

      workTotalDisplay.textContent = categoryTotals.Work;
      studyTotalDisplay.textContent = categoryTotals.Study;
      funTotalDisplay.textContent = categoryTotals.Fun;

      li.remove();
    });
  } else {
    alert("Please enter a number!");
  }
});

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    modeToggle.textContent = "☀️ light mode";
  } else {
    modeToggle.textContent = "🌙 dark mode";
  }
});


