export const getPages = async () => {
  const pages = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/pages-${process.env.STRAPI_ADMIN_LOCALE}?populate=deep`
  );
  const res = await pages.json();

  if (res?.data) {
    return res?.data.map((page) => ({
      params: {
        slug: page?.attributes.Slug,
      },
    }));
  }
  console.error("Unable to get data from api!");
  return [];
};
