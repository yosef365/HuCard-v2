// ==========================================
// HuCard CRUD Module
// ==========================================

// Load Profiles
async function loadProfiles() {

    const { data, error } = await db
        .from("profiles")
        .select(`
            *,
            companies(name),
            themes(name)
        `)
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        showToast("Error", error.message);

        return;

    }

    profiles = data || [];

    filteredProfiles = profiles;

    currentPage = 1;

    renderPage();

}

// ==========================================
// Render Profiles
// ==========================================

function renderProfiles(data = profiles) {

    const tbody =
        document.getElementById("profilesTableBody");

    tbody.innerHTML = "";

    if (data.length === 0) {

        document.getElementById("emptyState").style.display =
            "block";

        return;

    }

    document.getElementById("emptyState").style.display =
        "none";

    data.forEach(profile => {

        tbody.innerHTML += `

<tr>

<td>

<img
class="table-avatar"
src="${profile.avatar || 'https://placehold.co/60'}">

</td>

<td>${profile.name}</td>

<td>${profile.companies?.name ?? "-"}</td>

<td>${profile.profession ?? "-"}</td>

<td>${profile.phone ?? "-"}</td>

<td>

<span class="status ${profile.status}">
${profile.status}
</span>

</td>

<td>${profile.views}</td>

<td>

<button onclick="editProfile('${profile.id}')">

<i class="fas fa-pen"></i>

</button>

<button onclick="deleteProfile('${profile.id}')">

<i class="fas fa-trash"></i>

</button>

<button onclick="showQRCode('${profile.slug}')">

<i class="fas fa-qrcode"></i>

</button>

<a
target="_blank"
href="profile.html?slug=${profile.slug}">

<i class="fas fa-eye"></i>

</a>

</td>

</tr>

`;

    });

}

// ==========================================
// Open Add Profile
// ==========================================

function openAddProfile() {

    editingProfile = null;

    clearProfileForm();

    document.getElementById("modalTitle").innerText =
        "Add Profile";

    document.getElementById("profileModal").style.display =
        "flex";

}

// ==========================================
// Edit Profile
// ==========================================

async function editProfile(id) {

    editingProfile = id;

    const profile =
        profiles.find(p => p.id === id);

    if (!profile) return;

    document.getElementById("modalTitle").innerText =
        "Edit Profile";

    document.getElementById("profileId").value =
        profile.id;

    document.getElementById("fullName").value =
        profile.name || "";

    document.getElementById("jobTitle").value =
        profile.title || "";

    document.getElementById("profession").value =
        profile.profession || "";

    document.getElementById("bio").value =
        profile.bio || "";

    document.getElementById("phone").value =
        profile.phone || "";

    document.getElementById("whatsapp").value =
        profile.whatsapp || "";

    document.getElementById("email").value =
        profile.email || "";

    document.getElementById("website").value =
        profile.website || "";

    document.getElementById("address").value =
        profile.address || "";

    document.getElementById("company").value =
        profile.company_id || "";

    document.getElementById("theme").value =
        profile.theme_id || "";

    document.getElementById("status").value =
        profile.status || "active";

    document.getElementById("avatar").value =
        profile.avatar || "";

    document.getElementById("cover_image").value =
        profile.cover_image || "";

    document.getElementById("avatarPreview").src =
        profile.avatar || "https://placehold.co/150";

    document.getElementById("coverPreview").src =
        profile.cover_image || "https://placehold.co/900x250";

    await loadSocialLinks(profile.id);

    document.getElementById("profileModal").style.display =
        "flex";

}
// ==========================================
// Save Profile
// ==========================================

async function saveProfile() {

    const profile = {

        name: document.getElementById("fullName").value.trim(),

        title: document.getElementById("jobTitle").value.trim(),

        profession: document.getElementById("profession").value.trim(),

        bio: document.getElementById("bio").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        whatsapp: document.getElementById("whatsapp").value.trim(),

        email: document.getElementById("email").value.trim(),

        website: document.getElementById("website").value.trim(),

        address: document.getElementById("address").value.trim(),

        company_id:
            document.getElementById("company").value || null,

        theme_id:
            document.getElementById("theme").value || null,

        avatar:
            document.getElementById("avatar").value,

        cover_image:
            document.getElementById("cover_image").value,

        status:
            document.getElementById("status").value

    };

    let result;

    if (editingProfile) {

        result = await db

            .from("profiles")

            .update(profile)

            .eq("id", editingProfile)

            .select()

            .single();

    } else {

        const user = await getCurrentUser();

        if (!user) {

            showToast("Error","Login required");

            return;

        }

        profile.user_id = user.id;

        profile.slug = crypto.randomUUID();

        result = await db

            .from("profiles")

            .insert(profile)

            .select()

            .single();

    }

    if (result.error) {

        console.error(result.error);

        showToast("Error", result.error.message);

        return;

    }

    await saveSocialLinks(result.data.id);

    closeProfileModal();

    showToast("Success","Profile saved.");

    await loadProfiles();

    await loadStatistics();

}

// ==========================================
// Delete Profile
// ==========================================

async function deleteProfile(id){

    if(!confirm("Delete this profile?")) return;

    const {error}=await db

        .from("profiles")

        .delete()

        .eq("id",id);

    if(error){

        showToast("Error",error.message);

        return;

    }

    showToast("Success","Profile deleted.");

    await loadProfiles();

    await loadStatistics();

}

// ==========================================
// Load Companies
// ==========================================

async function loadCompanies(){

    const {data,error}=await db

        .from("companies")

        .select("*")

        .order("name");

    if(error){

        console.error(error);

        return;

    }

    companies=data || [];

    const company=document.getElementById("company");

    const filter=document.getElementById("filterCompany");

    company.innerHTML='<option value="">Select Company</option>';

    filter.innerHTML='<option value="">All Companies</option>';

    companies.forEach(c=>{

        company.innerHTML +=

        `<option value="${c.id}">
            ${c.name}
        </option>`;

        filter.innerHTML +=

        `<option value="${c.id}">
            ${c.name}
        </option>`;

    });

}

// ==========================================
// Load Themes
// ==========================================

async function loadThemes(){

    const {data,error}=await db

        .from("themes")

        .select("*")

        .order("name");

    if(error){

        console.error(error);

        return;

    }

    themes=data || [];

    const select=document.getElementById("theme");

    select.innerHTML='<option value="">Select Theme</option>';

    themes.forEach(theme=>{

        select.innerHTML +=

        `<option value="${theme.id}">
            ${theme.name}
        </option>`;

    });

      }
