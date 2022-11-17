import { sortByDate } from "@/utils/sortByDate";

export const getPosts = async () => {
  const posts = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/blogs?populate=deep`
  );
  const res = await posts.json();

  if (res) {
    const blog = res?.data.map((post) => {
      const { attributes } = post;
      const { Slug, Body } = attributes;

      return {
        slug: Slug,
        attributes,
        content: Body,
      };
    });

    return blog.sort(sortByDate);
  }
  return [];
};
