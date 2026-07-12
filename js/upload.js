// =========================================
// HuCard Upload Module
// =========================================

const AVATAR_BUCKET = "avatar";
const COVER_BUCKET = "cover";

// =========================================

async function uploadImage(file, bucket) {

    if (!file) return null;

    const extension = file.name.split(".").pop();

    const filename = crypto.randomUUID() + "." + extension;

    const { error } = await db.storage
        .from(bucket)
        .upload(filename, file);

    if (error) {
        console.error(error);
        return null;
    }

    const { data } = db.storage
        .from(bucket)
        .getPublicUrl(filename);

    return data.publicUrl;
}
async function uploadAvatar() {

    const input = document.getElementById("avatarFile");

    if (!input.files.length) return;

    showLoading();

    const url = await uploadImage(input.files[0], AVATAR_BUCKET);

    hideLoading();

    if (!url) return;

    document.getElementById("avatarPreview").src = url;

    document.getElementById("avatar").value = url;

}

async function uploadCover() {

    const input = document.getElementById("coverFile");

    if (!input.files.length) return;

    showLoading();

    const url = await uploadImage(input.files[0], COVER_BUCKET);

    hideLoading();

    if (!url) return;

    document.getElementById("coverPreview").src = url;

    document.getElementById("cover_image").value = url;

}

document.addEventListener("DOMContentLoaded", () => {

    const avatar = document.getElementById("avatarFile");

    if (avatar) {

        avatar.addEventListener("change", uploadAvatar);

    }

    const cover = document.getElementById("coverFile");

    if (cover) {

        cover.addEventListener("change", uploadCover);

    }

});
