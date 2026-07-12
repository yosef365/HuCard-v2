// ======================================
// HuCard Dashboard Controller
// ======================================

let profiles = [];
let companies = [];
let themes = [];
let filteredProfiles = [];

// editingProfile is declared once in modal.js (loaded earlier) and
// reused here. Do NOT redeclare it with let/const in this file —
// two "let editingProfile" declarations across script tags throws
// "Identifier 'editingProfile' has already been declared", which
// silently killed this entire file and every button on the page.

let currentPage = 1;
const pageSize = 10;

// ======================================
// Start
// ======================================

document.addEventListener("DOMContentLoaded", initDashboard);

async function initDashboard() {

    try {

        showLoading();

        if (typeof checkLogin === "function") {
            await checkLogin();
        }

        bindEvents();

        await Promise.all([
            loadCompanies(),
            loadThemes(),
            loadProfiles(),
            loadStatistics()
        ]);

    } catch (err) {

        console.error("Dashboard Error:", err);

        showToast("Error", err.message);

    } finally {

        hideLoading();

    }

}

// ======================================
// Events
// ======================================

function bindEvents() {

    const logout = document.getElementById("logoutBtn");

    if (logout) {
        logout.onclick = logoutUser;
    }

    const refresh = document.getElementById("refreshDashboard");

    if (refresh) {
        refresh.onclick = initializeDashboard;
    }

    const search = document.getElementById("searchProfile");

    if (search) {
        search.oninput = filterProfiles;
    }

    const company = document.getElementById("filterCompany");

    if (company) {
        company.onchange = filterProfiles;
    }

    const status = document.getElementById("filterStatus");

    if (status) {
        status.onchange = filterProfiles;
    }

    const close = document.getElementById("closeProfileModal");

    if (close) {
        close.onclick = closeProfileModal;
    }

    const cancel = document.getElementById("cancelProfile");

    if (cancel) {
        cancel.onclick = closeProfileModal;
    }

    const save = document.getElementById("saveProfile");

    if (save) {
        save.onclick = saveProfile;
    }

    const closeQR = document.getElementById("closeQRModal");

    if (closeQR) {
        closeQR.onclick = closeQRModal;
    }

    const firstPage = document.getElementById("firstPage");

    if (firstPage) {
        firstPage.onclick = () => goToPage(1);
    }

    const previousPage = document.getElementById("previousPage");

    if (previousPage) {
        previousPage.onclick = () => goToPage(currentPage - 1);
    }

    const nextPage = document.getElementById("nextPage");

    if (nextPage) {
        nextPage.onclick = () => goToPage(currentPage + 1);
    }

    const lastPage = document.getElementById("lastPage");

    if (lastPage) {
        lastPage.onclick = () =>
            goToPage(Math.ceil(filteredProfiles.length / pageSize));
    }

    const sort = document.getElementById("sortProfiles");

    if (sort) {
        sort.onchange = filterProfiles;
    }

}

// ======================================

async function initializeDashboard() {

    showLoading();

    await Promise.all([
        loadCompanies(),
        loadThemes(),
        loadProfiles(),
        loadStatistics()
    ]);

    hideLoading();

}

// ======================================
// Logout
// ======================================

async function logoutUser() {

    await db.auth.signOut();

    location.href = "index.html";

}

// ======================================
// Modal
// ======================================

function openAddProfile() {

    editingProfile = null;

    clearProfileForm();

    document.getElementById("modalTitle").textContent =
        "Add Profile";

    document.getElementById("profileModal").style.display =
        "flex";

}

function closeProfileModal() {

    document.getElementById("profileModal").style.display =
        "none";

}

// ======================================

window.openAddProfile = openAddProfile;
window.closeProfileModal = closeProfileModal;
