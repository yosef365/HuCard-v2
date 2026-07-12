// ==========================================
// HuCard Dashboard Statistics
// ==========================================

async function loadStatistics() {

    try {

        const [

            profilesResult,

            companiesResult,

            qrResult

        ] = await Promise.all([

            db
            .from("profiles")
            .select("views", { count: "exact" }),

            db
            .from("companies")
            .select("id", { count: "exact" }),

            db
            .from("qr_codes")
            .select("id", { count: "exact" })

        ]);

        // -----------------------------
        // Total Profiles
        // -----------------------------

        const totalProfiles =
            profilesResult.data?.length || 0;

        document.getElementById("totalProfiles").textContent =
            totalProfiles;

        // -----------------------------
        // Total Companies
        // -----------------------------

        document.getElementById("totalCompanies").textContent =
            companiesResult.count || 0;

        // -----------------------------
        // Total Views
        // -----------------------------

        let totalViews = 0;

        profilesResult.data.forEach(profile => {

            totalViews += profile.views || 0;

        });

        document.getElementById("totalViews").textContent =
            totalViews;

        // -----------------------------
        // Total QR
        // -----------------------------

        document.getElementById("totalQR").textContent =
            qrResult.count || 0;

    }

    catch (err) {

        console.error(err);

        showToast("Error", "Unable to load dashboard statistics.");

    }

}
