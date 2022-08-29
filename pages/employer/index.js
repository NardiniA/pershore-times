import Employer from "@/components/Employer";
import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Job from "@/components/Job";
import { getEmployers } from "@/libs/getEmployers";
import { getJobs } from "@/libs/getJobs";
import { IconNewSection } from "@tabler/icons";
import Link from "next/link";

export default function Employers({ employers, jobs }) {
  const allEmployer = jobs.map((employer) => employer.frontMatter.employer);
  const jobCount = [];
  allEmployer.forEach((x) => {
    jobCount[x] = (jobCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle="Our Employers | Pershore Times">
      <PageHeaderBlock title="Employer" />

      <section className="section-sm pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row gx-4 gy-5 gx-md-5 justify-content-center text-center">
                {employers.map((employer, i) => (
                  <div key={i} className="col-lg-4 col-sm-6">
                    <Employer employer={employer} jobCount={jobCount} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <hr className="bg-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">
                <span>Recent jobs</span>
              </h2>
            </div>
          </div>
          <div className="row gy-5 gx-4 g-xl-5">
            {jobs
              .filter((job, i) => i < 4)
              .map((job, i) => (
                <div key={i} className="col-lg-6">
                  <Job job={job} employers={employers} />
                </div>
              ))}

            <div className="col-12 text-center">
              <Link href={`/vacancies`}>
                <a className="btn btn-primary mt-5" aria-label="View all vacancies">
                  <i className="me-2">
                    <IconNewSection size={16} />
                  </i>
                  View all vacancies
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      employers: getEmployers(),
      jobs: getJobs(),
    },
  };
}
