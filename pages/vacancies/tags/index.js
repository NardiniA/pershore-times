import Link from 'next/link';
import PageHeaderBlock from '@/components/PageHeader';
import Layout from '@/components/Layout';
import { getJobs } from '@/libs/getJobs';
import { IconTags } from '@tabler/icons';

export default function Tags({ jobs }) {
  const allTags = jobs.map((tag) => tag.frontMatter.tags);
  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  // count tag jobs
  let tagArray = [];
  uniqueTags.map((tag) => {
    flatTags.map((t) => {
      if (tag === t) {
        tagArray.push(tag);
      }
    });
  });
  const jobCount = [];
  tagArray.forEach((x) => {
    jobCount[x] = (jobCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle="All Tags | Pershore Times">
      <PageHeaderBlock title="All tags" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {uniqueTags.map((tag, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link href={`/vacancies/tags/${tag.replace(/ /g, '-').toLowerCase()}`}>
                <a className="p-4 rounded bg-white d-block is-hoverable">
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconTags size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{tag}</span>
                  Total {jobCount[tag]} jobs
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
      jobs: getJobs(),
    },
  };
}
