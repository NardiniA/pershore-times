export const formatEmployerName = (name) => {
    if (!name) return;
    const n = name.replace("content/employers/", "").replace(".md", "");
    return n.split("-").map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
}
