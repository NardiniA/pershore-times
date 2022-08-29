import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Job from '@/components/Job';
import Layout from '@/components/Layout';
import { getJobs } from '@/libs/getJobs';
import { getEmployers } from '@/libs/getEmployers';
import PageHeaderTaxo from '@/components/PageHeaderTaxonomy';

export default function TagSingle({ employers, jobs, tag }) {
  let flatJobs = jobs.flat();
  function getUniqueJobsBy(flatJobs, key) {
    return [...new Map(flatJobs.map((item) => [item[key], item])).values()];
  }
  const uniqueJobs = getUniqueJobsBy(flatJobs, 'slug');

  return (
    <Layout
      metaTitle={`Showing jobs from - ${
        tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')
      } | Pershore Times`}
    >
      <div className="container">
        <PageHeaderTaxo title={tag} />

        <div className="row gy-5 gx-4 g-xl-5">
          {uniqueJobs.map((job, i) => (
            <div key={i} className="col-lg-6">
              <Job job={job} employers={employers} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const file = fs.readdirSync(path.join('content/vacancies'));
  const allTags = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/vacancies', file),
      'utf-8'
    );
    const { data: frontmatter } = matter(dirFileContents);

    return frontmatter.tags;
  });

  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  const paths = uniqueTags.map((t) => ({
    params: {
      tagname: t.toString().replace(/ /g, '-').toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const file = fs.readdirSync(path.join('content/vacancies'));
  const jobs = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/vacancies', file),
      'utf-8'
    );
    const { data: frontMatter } = matter(dirFileContents);
    const filterFm = frontMatter.tags.filter(
      (c) => c.toLowerCase().replace(/ /g, '-') === params.tagname
    );

    const job = getJobs();
    const data = job.filter((e) => {
      return e.frontMatter.tags.some((a) => {
        return filterFm.indexOf(a) != -1;
      });
    });

    return data;
  });

  return {
    props: {
      employers: getEmployers(),
      jobs: jobs,
      tag: params.tagname,
    },
  };
}
