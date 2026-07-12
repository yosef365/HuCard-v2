// ======================================
// HuCard Social Links
// ======================================

// Load social links when editing profile

async function loadSocialLinks(profileId) {

    const { data, error } = await db

        .from("social_links")

        .select("*")

        .eq("profile_id", profileId);

    if (error) {

        console.error(error);

        return;

    }

    // Clear all fields

    document.getElementById("facebook").value = "";
    document.getElementById("instagram").value = "";
    document.getElementById("linkedin").value = "";
    document.getElementById("telegram").value = "";
    document.getElementById("tiktok").value = "";
    document.getElementById("youtube").value = "";

    data.forEach(link => {

        const input = document.getElementById(link.platform);

        if (input) {

            input.value = link.url;

        }

    });

}

// ======================================
// Save Social Links
// ======================================

async function saveSocialLinks(profileId) {

    await db

        .from("social_links")

        .delete()

        .eq("profile_id", profileId);

    const links = [];

    addLink("facebook");
    addLink("instagram");
    addLink("linkedin");
    addLink("telegram");
    addLink("tiktok");
    addLink("youtube");

    function addLink(platform) {

        const value = document
            .getElementById(platform)
            .value
            .trim();

        if (!value) return;

        links.push({

            profile_id: profileId,

            platform,

            url: value

        });

    }

    if (links.length) {

        const { error } = await db

            .from("social_links")

            .insert(links);

        if (error) {

            console.error(error);

        }

    }

}
