import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Job from "@/components/Job";
import postConfig from "@/config/site.config.json";
import { getEmployers } from "@/libs/getEmployers";
import { getJobs } from "@/libs/getJobs";
import fs from "fs";
import path from "path";

export default function Vacancies({ employers, jobs, currentPage, numberOfPages }) {
  return (
    <Layout metaTitle="All Vacancies | Pershore Times">
      <PageHeaderBlock title="All Vacancies" />

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {jobs.map((job, i) => (
            <div key={i} className="col-lg-6">
              <Job job={job} employers={employers} />
            </div>
          ))}

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} dir="vacancies" />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const jobDirFiles = fs.readdirSync(path.join("content/vacancies"));
  const numberOfPages = Math.ceil(jobDirFiles.length / postConfig.postPerPage);

  let paths = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const jobDirFiles = fs.readdirSync(path.join("content/vacancies"));
  const jobs = jobDirFiles.filter((f) => f.includes(".md"));

  const returnDirFiles = getJobs();

  const page = parseInt(params && params.page) || 1;
  const numberOfPages = Math.ceil(jobs.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const orderedJobs = returnDirFiles.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return {
    props: {
      employers: getEmployers(),
      jobs: orderedJobs,
      currentPage: page,
      numberOfPages,
    },
  };
}
