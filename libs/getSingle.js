export const getSingle = async (slug, path) => {
    const single = await fetch(
      `${process.env.STRAPI_ADMIN_URL}/api/${path}?filters[Slug][$eq]=${slug}&populate=deep`
    );
    const page = await single.json();

    if (page?.data[0]) {
      return page?.data[0];
    } else {
    return { notfound: true };
    }
}