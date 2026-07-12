// ========================================
// HuCard Public Profile
// Part 1
// ========================================

// Current profile
let profile = null;

// ========================================
// Initialize
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    const slug = getSlug();

    if (!slug) {

        showNotFound();

        return;

    }

    await loadProfile(slug);

});

// ========================================
// Get slug from URL
// ========================================

function getSlug() {

    const params = new URLSearchParams(window.location.search);

    return params.get("slug");

}

// ========================================
// Load Profile
// ========================================

async function loadProfile(slug) {

    const { data, error } = await db

        .from("profiles")

        .select(`
            *,
            companies(*),
            themes(*)
        `)

        .eq("slug", slug)

        .single();

    if (error || !data) {

        console.error(error);

        showNotFound();

        return;

    }

    profile = data;

    renderProfile();

    await increaseViews();

}

// ========================================
// Render Profile
// ========================================

function renderProfile() {

    document.title = profile.name + " | HuCard";

    document.getElementById("profileName").textContent =
        profile.name || "";

    document.getElementById("profileTitle").textContent =
        profile.title || "";

    document.getElementById("profession").textContent =
        profile.profession || "";

    document.getElementById("bio").textContent =
        profile.bio || "";

    document.getElementById("phone").textContent =
        profile.phone || "";

    document.getElementById("email").textContent =
        profile.email || "";

    document.getElementById("website").textContent =
        profile.website || "";

    document.getElementById("address").textContent =
        profile.address || "";

    document.getElementById("avatar").src =
        profile.avatar || "images/avatar.png";

    document.getElementById("coverImage").src =
        profile.cover_image || "images/cover.jpg";

    if (profile.companies) {

        document.getElementById("companyName").textContent =
            profile.companies.name;

    }

    applyTheme();

}

// ========================================
// Apply Theme
// ========================================

function applyTheme() {

    if (!profile.themes) return;

    document.documentElement.style.setProperty(

        "--primary",

        profile.themes.primary_color

    );

    document.documentElement.style.setProperty(

        "--secondary",

        profile.themes.secondary_color

    );

    document.documentElement.style.setProperty(

        "--background",

        profile.themes.background_color

    );

    document.documentElement.style.setProperty(

        "--text",

        profile.themes.text_color

    );

}

// ========================================
// Increase Views
// ========================================

async function increaseViews() {

    await db

        .from("profiles")

        .update({

            views: (profile.views || 0) + 1

        })

        .eq("id", profile.id);

}

// ========================================

function showNotFound() {

    document.body.innerHTML = `

    <div style="padding:100px;text-align:center">

        <h1>Profile Not Found</h1>

        <p>This HuCard profile does not exist.</p>

    </div>

    `;

}
// ========================================
// HuCard Public Profile
// Part 2
// ========================================

// Load Social Links
async function loadSocialLinks() {

    const container = document.getElementById("socialLinks");

    if (!container) return;

    const { data, error } = await db

        .from("social_links")

        .select("*")

        .eq("profile_id", profile.id)

        .order("platform");

    if (error) {

        console.error(error);

        return;

    }

    container.innerHTML = "";

    if (!data.length) {

        container.style.display = "none";

        return;

    }

    data.forEach(link => {

        const a = document.createElement("a");

        a.href = link.url;

        a.target = "_blank";

        a.rel = "noopener";

        a.className = "social-btn";

        a.innerHTML = getSocialIcon(link.platform);

        container.appendChild(a);

    });

}

// ========================================
// Social Icons
// ========================================

function getSocialIcon(platform){

    switch(platform.toLowerCase()){

        case "facebook":
            return '<i class="fab fa-facebook-f"></i>';

        case "instagram":
            return '<i class="fab fa-instagram"></i>';

        case "linkedin":
            return '<i class="fab fa-linkedin-in"></i>';

        case "telegram":
            return '<i class="fab fa-telegram"></i>';

        case "tiktok":
            return '<i class="fab fa-tiktok"></i>';

        case "youtube":
            return '<i class="fab fa-youtube"></i>';

        case "x":
        case "twitter":
            return '<i class="fab fa-x-twitter"></i>';

        default:
            return '<i class="fas fa-link"></i>';

    }

}

// ========================================
// Save Analytics
// ========================================

async function saveAnalytics(){

    try{

        await db

        .from("analytics")

        .insert({

            profile_id: profile.id,

            browser: navigator.userAgent,

            os: navigator.platform,

            device:
                window.innerWidth < 768
                ? "Mobile"
                : "Desktop"

        });

    }

    catch(err){

        console.log(err);

    }

}

// ========================================
// Share Profile
// ========================================

async function shareProfile(){

    if(navigator.share){

        try{

            await navigator.share({

                title: profile.name,

                text: profile.title || "",

                url: window.location.href

            });

        }

        catch(e){}

    }

    else{

        navigator.clipboard.writeText(

            window.location.href

        );

        alert("Profile link copied.");

    }

}

// ========================================
// Download vCard
// ========================================

function downloadVCard(){

    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || ""}
ORG:${profile.companies?.name || ""}
TITLE:${profile.title || ""}
TEL:${profile.phone || ""}
EMAIL:${profile.email || ""}
URL:${profile.website || ""}
ADR:;;${profile.address || ""};;;;
END:VCARD`;

    const blob = new Blob([vcf],{

        type:"text/vcard"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${profile.slug}.vcf`;

    a.click();

    URL.revokeObjectURL(url);

}

// ========================================
// QR Download
// ========================================

function downloadQRCode(){

    const qr = document.querySelector("#qrContainer canvas");

    if(!qr) return;

    const a = document.createElement("a");

    a.download = profile.slug + "-qr.png";

    a.href = qr.toDataURL();

    a.click();

}

// ========================================
// Generate QR
// ========================================

function generateQRCode(){

    const container = document.getElementById("qrContainer");

    if(!container) return;

    container.innerHTML="";

    new QRCode(container,{

        text:window.location.href,

        width:180,

        height:180

    });

}

// ========================================
// Final Initialization
// ========================================

document.addEventListener("DOMContentLoaded",async()=>{

    const slug=getSlug();

    if(!slug) return;

    await loadProfile(slug);

    await loadSocialLinks();

    await saveAnalytics();

    generateQRCode();

});

// ========================================
