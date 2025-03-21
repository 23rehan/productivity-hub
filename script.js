// Sidebar Navigation
document.getElementById("tasks-link").addEventListener("click", function () {
    showSection("tasks-section");
});

document.getElementById("budget-link").addEventListener("click", function () {
    showSection("budget-section");
});

document.getElementById("dashboard-link").addEventListener("click", function () {
    showSection("dashboard");
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Task & Goal Planner
document.getElementById("add-task").addEventListener("click", function () {
    let taskInput = document.getElementById("task-input").value;
    if (taskInput.trim() !== "") {
        let li = document.createElement("li");
        li.textContent = taskInput;
        
        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            li.remove();
        };

        li.appendChild(deleteBtn);
        document.getElementById("task-list").appendChild(li);
        document.getElementById("task-input").value = "";
    }
});

// Budget Tracker
let totalBudget = 0;
document.getElementById("add-expense").addEventListener("click", function () {
    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    
    if (name.trim() !== "" && amount.trim() !== "" && !isNaN(amount)) {
        totalBudget += parseFloat(amount);
        
        let li = document.createElement("li");
        li.textContent = `${name}: $${amount}`;
        
        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function () {
            totalBudget -= parseFloat(amount);
            document.getElementById("total-budget").textContent = totalBudget;
            li.remove();
        };

        li.appendChild(deleteBtn);
        document.getElementById("expense-list").appendChild(li);
        
        document.getElementById("total-budget").textContent = totalBudget;
        document.getElementById("expense-name").value = "";
        document.getElementById("expense-amount").value = "";
    }
});
