export const getSinglePaper = async (id, path) => {
  const single = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/${path}?filters[Issue][$eq]=${id}&populate=deep`
  );
  const page = await single.json();

  if (page?.data[0]) {
    return page?.data[0];
  } else {
    return { notfound: true };
  }
};
