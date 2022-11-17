export const getSiteConfig = async () => {
    const res = await fetch(`${process.env.STRAPI_ADMIN_URL}/api/${process.env.STRAPI_ADMIN_LOCALE}-config?populate=deep`);
    const site = await res.json();

    if (site) return site?.data?.attributes;
    return { notfound: true };
}