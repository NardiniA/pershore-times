import { getPosts } from "@/libs/getPosts";
import { getSingle } from "@/libs/getSingle";
import { getConfig } from "@/libs/getConfig";
import Slug from "./[slug]";

export default Slug;

export async function getStaticProps() {
  return {
    props: {
      data: await getSingle("home", `pages-${process.env.STRAPI_ADMIN_LOCALE}`),
      posts: await getPosts(),
      config: await getConfig(),
    },
  };
}