import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import { getConfig } from "@/libs/getConfig";

export default function Blog({ posts, currentPage, numberOfPages, config }) {
  return (
    <Layout metaTitle="All Posts | Upton Times" config={config}>
      <PageHeaderBlock title="All posts" />

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} />
            </div>
          ))}

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} dir="blog" />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/blogs&populate=deep`
  );
  const res = await posts.json();

  let paths = [];

  for (let i = 1; i <= res?.meta?.pagination.pageCount; i++) {
    paths.push({
      params: {
        page: i.toString()
      },
    });
  };

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params && params.page) || 1;
  const res = await fetch(
    `${process.env.STRAPI_ADMIN_URL}/api/blogs?pagination[page]=${page}&populate=deep`
  );
  const posts = await res.json();

  return {
    props: {
      posts: posts?.data,
      currentPage: page,
      numberOfPages: posts?.meta?.pagination.pageCount,
      config: await getConfig(),
    },
  };
}
