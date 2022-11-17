import Link from 'next/link';
import PageHeaderBlock from '@/components/PageHeader';
import Layout from '@/components/Layout';
import { getTags } from '@/libs/getTags';
import { IconTags } from '@tabler/icons';
import { getConfig } from "@/libs/getConfig";

export default function Tags({ tags, config }) {
  return (
    <Layout metaTitle="All Tags | Upton Times" config={config}>
      <PageHeaderBlock title="All tags" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {tags.map((tag, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link href={`/today/tags/${tag.slug}`}>
                <a className="p-4 rounded bg-white d-block is-hoverable">
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconTags size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{tag.name}</span>
                  Total {tag?.blogs.length} post{tag?.blogs.length > 1 && "s"}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {

  return {
    props: {
      tags: await getTags(),
      config: await getConfig(),
    },
  };
}
