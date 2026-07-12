// ==========================================
// HuCard Dashboard Filters & Pagination
// ==========================================

// Filters "profiles" down to "filteredProfiles" based on the
// search box, company dropdown, status dropdown, and sort order.
function filterProfiles() {

    const search = (document.getElementById("searchProfile")?.value || "")
        .toLowerCase()
        .trim();

    const companyId = document.getElementById("filterCompany")?.value || "";

    const status = document.getElementById("filterStatus")?.value || "";

    const sortBy = document.getElementById("sortProfiles")?.value || "created_at";

    filteredProfiles = profiles.filter(profile => {

        const matchesSearch = !search ||
            (profile.name && profile.name.toLowerCase().includes(search)) ||
            (profile.profession && profile.profession.toLowerCase().includes(search)) ||
            (profile.phone && profile.phone.toLowerCase().includes(search));

        const matchesCompany = !companyId || profile.company_id === companyId;

        const matchesStatus = !status || profile.status === status;

        return matchesSearch && matchesCompany && matchesStatus;

    });

    if (sortBy === "name") {
        filteredProfiles.sort((a, b) =>
            (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "views") {
        filteredProfiles.sort((a, b) =>
            (b.views || 0) - (a.views || 0));
    } else {
        filteredProfiles.sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at));
    }

    currentPage = 1;

    renderPage();

}

// Renders the current page slice of filteredProfiles into the table
// and refreshes the pagination footer.
function renderPage() {

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    renderProfiles(filteredProfiles.slice(start, end));

    updatePaginationUI();

}

function updatePaginationUI() {

    const total = filteredProfiles.length;

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    if (currentPage > totalPages) currentPage = totalPages;

    if (currentPage < 1) currentPage = 1;

    const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;

    const end = Math.min(currentPage * pageSize, total);

    const currentPageEl = document.getElementById("currentPage");
    const pageStartEl = document.getElementById("pageStart");
    const pageEndEl = document.getElementById("pageEnd");
    const totalRecordsEl = document.getElementById("totalRecords");

    if (currentPageEl) currentPageEl.textContent = currentPage;
    if (pageStartEl) pageStartEl.textContent = start;
    if (pageEndEl) pageEndEl.textContent = end;
    if (totalRecordsEl) totalRecordsEl.textContent = total;

    const firstBtn = document.getElementById("firstPage");
    const prevBtn = document.getElementById("previousPage");
    const nextBtn = document.getElementById("nextPage");
    const lastBtn = document.getElementById("lastPage");

    if (firstBtn) firstBtn.disabled = currentPage <= 1;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    if (lastBtn) lastBtn.disabled = currentPage >= totalPages;

}

function goToPage(page) {

    const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));

    currentPage = Math.min(Math.max(1, page), totalPages);

    renderPage();

}
