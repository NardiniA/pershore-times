import Layout from "@/components/Layout";
import Job from "@/components/Job";
import { getEmployers } from "@/libs/getEmployers";
import { getJobs } from "@/libs/getJobs";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import path from "path";

export default function EmployerSingle({
  content,
  frontMatter: { name, logo },
  employers,
  jobs,
}) {
  const allEmployer = jobs.map((employer) => employer.frontMatter.employer);
  const jobCount = [];
  allEmployer.forEach((x) => {
    jobCount[x] = (jobCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle={name + " | Pershore Times"}>
      <section className="page-header section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4 g-lg-5 text-center text-lg-start justify-content-center justify-content-lg-start">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                  <Image
                    className="rounded"
                    src={logo}
                    alt={name}
                    width={`250`}
                    height={`250`}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={logo}
                  />
                </div>
                <div className="col-lg-9 col-md-12">
                  <p className="mb-2">
                    <span className="fw-bold text-black">
                      {jobCount[name] < 9
                        ? `0${jobCount[name]}`
                        : jobCount[name]}
                    </span>{" "}
                    Published jobs
                  </p>
                  <h1 className="h3 text-dark mb-3">{name}</h1>
                  <div className="content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(content),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {jobs.map((job, i) =>
            job.frontMatter.employer === name ? (
              <div key={i} className="col-lg-6">
                <Job job={job} employers={employers} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const employerDirFiles = fs.readdirSync(path.join("content/employers"));
  const employers = employerDirFiles.filter((f) => f.includes(".md"));

  const paths = employers.map((filename) => ({
    params: {
      employer_slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { employer_slug } }) {
  const fileContents = fs.readFileSync(
    path.join("content/employers", employer_slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      employer_slug,
      frontMatter,
      content,
      employers: getEmployers(),
      jobs: getJobs(),
    },
  };
}
