// ==========================================
// HuCard Modal Manager
// ==========================================
// This variable is shared with CRUD
let editingProfile = null;
// ==========================================
// Open Add Profile
// ==========================================
function openAddProfile() {
    editingProfile = null;
    clearProfileForm();
    document.getElementById("modalTitle").textContent =
        "Add Profile";
    document.getElementById("profileModal").style.display =
        "flex";
}
// ==========================================
// Open Edit Profile
// ==========================================
function openEditProfile() {
    document.getElementById("modalTitle").textContent =
        "Edit Profile";
    document.getElementById("profileModal").style.display =
        "flex";
}
// ==========================================
// Close Modal
// ==========================================
function closeProfileModal() {
    document.getElementById("profileModal").style.display =
        "none";
}
// ==========================================
// Register Events
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn =
        document.getElementById("closeProfileModal");
    const cancelBtn =
        document.getElementById("cancelProfile");
    if (closeBtn) {
        closeBtn.addEventListener(
            "click",
            closeProfileModal
        );
    }

    if (cancelBtn) {
        cancelBtn.addEventListener(
            "click",
            closeProfileModal
        );
    }
});
// ==========================================
// Close When Clicking Outside
// ==========================================
window.addEventListener("click", (e) => {
    const modal =
        document.getElementById("profileModal");
    if (!modal) return;
    if (e.target === modal) {
        closeProfileModal();
    }
});
// ==========================================
// ESC Key
// ==========================================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProfileModal();
    }
});
