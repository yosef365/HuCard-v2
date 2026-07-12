// ==========================================
// HuCard Utilities
// ==========================================

// Loading
function showLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "flex";

    }

}

function hideLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "none";

    }

}

// ==========================================
// Toast
// ==========================================

function showToast(title, message) {

    const toast = document.getElementById("toast");

    if (!toast) {

        alert(title + "\n" + message);

        return;

    }

    document.getElementById("toastTitle").textContent = title;

    document.getElementById("toastMessage").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("closeToast");

    if (btn) {

        btn.onclick = () => {

            document
                .getElementById("toast")
                .classList
                .remove("show");

        };

    }

});

// ==========================================
// Confirm
// ==========================================

function confirmDelete(message = "Delete this profile?") {

    return confirm(message);

}

// ==========================================
// Date
// ==========================================

function formatDate(date) {

    if (!date) return "";

    return new Date(date).toLocaleDateString();

}

// ==========================================
// UUID
// ==========================================

function generateSlug() {

    return crypto.randomUUID();

}

// ==========================================
// Safe Value
// ==========================================

function value(v) {

    return v ?? "";

}

// ==========================================
// Avatar
// ==========================================

function avatar(url) {

    if (!url || url === "") {

        return "https://placehold.co/150";

    }

    return url;

}

// ==========================================
// Cover
// ==========================================

function cover(url) {

    if (!url || url === "") {

        return "https://placehold.co/900x250";

    }

    return url;

}

// ==========================================
// Profile URL
// ==========================================

function getProfileUrl(slug) {

    return `${window.location.origin}${window.location.pathname.replace("dashboard.html","")}profile.html?slug=${slug}`;

}

// ==========================================
// Reset Form
// ==========================================

function clearProfileForm() {

    editingProfile = null;

    document.getElementById("profileId").value = "";

    document.getElementById("fullName").value = "";

    document.getElementById("jobTitle").value = "";

    document.getElementById("profession").value = "";

    document.getElementById("bio").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("whatsapp").value = "";

    document.getElementById("email").value = "";

    document.getElementById("website").value = "";

    document.getElementById("address").value = "";

    document.getElementById("company").value = "";

    document.getElementById("theme").value = "";

    document.getElementById("status").value = "active";

    document.getElementById("avatar").value = "";

    document.getElementById("cover_image").value = "";

    document.getElementById("avatarPreview").src =
        "https://placehold.co/150";

    document.getElementById("coverPreview").src =
        "https://placehold.co/900x250";

    document.getElementById("facebook").value = "";

    document.getElementById("instagram").value = "";

    document.getElementById("linkedin").value = "";

    document.getElementById("telegram").value = "";

    document.getElementById("tiktok").value = "";

    document.getElementById("youtube").value = "";

}
