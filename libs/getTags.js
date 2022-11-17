export const getTags = async () => {
    const pages = await fetch(
      `${process.env.STRAPI_ADMIN_URL}/api/tags?populate=deep`
    );
    const res = await pages.json();

    if (res?.data) {
      return res?.data.map((page) => ({
        name: page?.attributes.Name,
        slug: page?.attributes.Slug,
        blogs: page?.attributes?.blogs?.data,
      }));
    }
    console.error("Unable to get data from api!");
    return [];
}