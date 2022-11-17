import Post from '@/components/Post';
import Layout from '@/components/Layout';
import PageHeaderTaxo from '@/components/PageHeaderTaxonomy';
import { getTagsPaths } from '@/libs/getTagsPaths';
import { getSingle } from '@/libs/getSingle';
import { getConfig } from '@/libs/getConfig';

export default function TagSingle({ tag, config }) {
  return (
    <Layout
      metaTitle={`Showing posts from - ${tag.Name} | Upton Times`}
      config={config}
    >
      <div className="container">
        <PageHeaderTaxo title={tag.Name} />

        <div className="row gy-5 gx-4 g-xl-5">
          {tag?.blogs?.data.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getTagsPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { tagname } }) {
  const tag = await getSingle(tagname, "tags");

  return {
    props: {
      tag: tag?.attributes,
      config: await getConfig(),
    },
  };
}
