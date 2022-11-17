export const getMenu = async () => {
    const res = await fetch(`${process.env.STRAPI_ADMIN_URL}/api/menus/1?nested&populate=deep`);
    const menu = await res.json();

    if (menu) return menu?.data?.attributes?.items?.data;
    return [];
}