document.addEventListener("DOMContentLoaded", function() {
    // Current page ka naam pata lagana (e.g., "add.html")
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "index.html"; // Agar direct domain khula ho

    // Navigation ka HTML code
    const navHTML = `
    <div class="bottom-nav">
        <a href="index.html" class="nav-item ${currentPage === 'index.html' ? 'active' : ''}">
            <div class="nav-icon">🏠</div><span>Home</span>
        </a>
        <a href="add.html" class="nav-item ${currentPage === 'add.html' ? 'active' : ''}">
            <div class="nav-icon">➕</div><span>Add</span>
        </a>
        <a href="notification.html" class="nav-item ${currentPage === 'notification.html' ? 'active' : ''}">
            <div class="nav-icon">🔔</div><span>Alerts</span>
        </a>
        <a href="adminmeal.html" class="nav-item ${currentPage === 'adminmeal.html' ? 'active' : ''}">
            <div class="nav-icon">🍽️</div><span>Menu</span>
        </a>
        <a href="setting.html" class="nav-item ${currentPage === 'setting.html' ? 'active' : ''}">
            <div class="nav-icon">⚙️</div><span>Settings</span>
        </a>
    </div>
    `;

    // HTML ko body ke sabse neeche add karna
    document.body.insertAdjacentHTML('beforeend', navHTML);
});
