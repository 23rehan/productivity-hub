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

document.getElementById("weather-link").addEventListener("click", function () {
    showSection("weather-section");
    fetchWeather();
});

document.getElementById("events-link").addEventListener("click", function () {
    showSection("events-section");
});

document.getElementById("focus-timer-link").addEventListener("click", function () {
    showSection("focus-timer-section");
});

document.getElementById("quick-notes-link").addEventListener("click", function () {
    showSection("quick-notes-section");
});

document.getElementById("ai-tasks-link").addEventListener("click", function () {
    showSection("ai-tasks-section");
});

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
});

// Weather Widget
function fetchWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("weather-location").textContent = `Lat: ${lat}, Lon: ${lon}`;
                document.getElementById("weather-temp").textContent = data.current_weather.temperature;
                document.getElementById("weather-condition").textContent = data.current_weather.weathercode;
            });
    });
}

// Focus Timer (Pomodoro Technique)
let timer;
let timeLeft = 1500; // Start with 25 minutes (Pomodoro time)
let isBreakTime = false;

document.getElementById("start-timer").addEventListener("click", function () {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer-display").textContent = formatTime(timeLeft);
        } else {
            clearInterval(timer);
            if (!isBreakTime) {
                alert("Focus time's up! Take a break.");
                isBreakTime = true;
                timeLeft = 300; // Break time (5 minutes)
                document.getElementById("timer-display").textContent = formatTime(timeLeft);
            } else {
                alert("Break time's up! Time to focus again.");
                isBreakTime = false;
                timeLeft = 1500; // Reset to 25 minutes for focus time
                document.getElementById("timer-display").textContent = formatTime(timeLeft);
            }
        }
    }, 1000);
});

document.getElementById("reset-timer").addEventListener("click", function () {
    clearInterval(timer);
    isBreakTime = false;
    timeLeft = 1500; // Reset to 25 minutes for focus time
    document.getElementById("timer-display").textContent = formatTime(timeLeft);
});

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// AI Task Suggestions
const aiTasks = ["Organize your workspace", "Plan tomorrow’s tasks", "Take a short walk", "Read for 10 minutes"];

document.getElementById("generate-task").addEventListener("click", function () {
    document.getElementById("ai-task").textContent = aiTasks[Math.floor(Math.random() * aiTasks.length)];
});

// Quick Notes
document.getElementById("save-note").addEventListener("click", function () {
    localStorage.setItem("quickNote", document.getElementById("quick-note").value);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("quick-note").value = localStorage.getItem("quickNote") || "";
});

// Task Management
let tasks = [];
let taskCount = 0;
document.getElementById("add-task").addEventListener("click", function () {
    let task = document.getElementById("task-input").value;
    if (task) {
        tasks.push(task);
        taskCount++;
        updateTaskList();
        document.getElementById("task-input").value = '';
        document.getElementById("task-progress").textContent = `${(taskCount / tasks.length) * 100}%`;
    }
});

function updateTaskList() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Goal Setting & Milestones
let goal = '';
let milestones = [];
document.getElementById("set-goal").addEventListener("click", function () {
    goal = document.getElementById("goal-input").value;
    if (goal) {
        document.getElementById("goal-display").textContent = `Goal: ${goal}`;
    }
});

document.getElementById("add-milestone").addEventListener("click", function () {
    let milestone = document.getElementById("milestone-input").value;
    if (milestone) {
        milestones.push(milestone);
        updateMilestoneList();
        document.getElementById("milestone-input").value = '';
    }
});

function updateMilestoneList() {
    let milestoneList = document.getElementById("milestone-list");
    milestoneList.innerHTML = '';
    milestones.forEach(milestone => {
        let li = document.createElement("li");
        li.textContent = milestone;
        milestoneList.appendChild(li);
    });
}
