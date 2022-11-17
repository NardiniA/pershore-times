import Layout from "@/components/Layout";
import BlockZone from "@/components/BlockZone";
import { getSingle } from "@/libs/getSingle";
import { getPages } from "@/libs/getPages";
import { getPosts } from "@/libs/getPosts";
import { getConfig } from "@/libs/getConfig";

export default function Slug({ data: { attributes }, posts, config }) {
    return (
      <Layout
        metaTitle={attributes.Title + " | Upton Times"}
        config={config}
      >
        <section>
          <div className="container">
            <BlockZone sections={attributes?.Sections} posts={posts} />
          </div>
        </section>
      </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getPages();

    return {
      paths,
      fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      data: await getSingle(slug, `pages-${process.env.STRAPI_ADMIN_LOCALE}`),
      posts: await getPosts(),
      config: await getConfig(),
    }
  }
}
