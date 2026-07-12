// ======================================
// HuCard QR Module
// ======================================

// Build public profile URL

function getProfileURL(slug) {

    const base = window.location.origin;

    const folder = window.location.pathname.replace(

        "dashboard.html",

        ""

    );

    return `${base}${folder}profile.html?slug=${slug}`;

}

// ======================================
// Show QR
// ======================================

function showQRCode(slug) {

    const modal =
        document.getElementById("qrModal");

    const container =
        document.getElementById("qrContainer");

    modal.style.display = "flex";

    container.innerHTML = "";

    const url = getProfileURL(slug);

    new QRCode(container, {

        text: url,

        width: 220,

        height: 220

    });

    document

        .getElementById("downloadQR")

        .onclick = () => downloadQR(url);

}

// ======================================

function closeQRModal() {

    document

        .getElementById("qrModal")

        .style.display = "none";

}

// ======================================
// Download QR
// ======================================

function downloadQR() {

    const img =

        document.querySelector("#qrContainer img");

    if (!img) return;

    const link = document.createElement("a");

    link.href = img.src;

    link.download = "HuCard-QR.png";

    link.click();

}
