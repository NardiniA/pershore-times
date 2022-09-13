import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import { formatEmployerName } from "@/libs/formatEmployerName";
import { getEmployers } from "@/libs/getEmployers";
import { formatDate } from "@/utils/formatDate";
import { truncateString } from "@/utils/truncateString";
import {
  IconArrowUpRight,
  IconCalendarEvent,
} from "@tabler/icons";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import Share from "@/components/Share";

export default function JobPage({
  slug,
  content,
  frontMatter: { title, employer, date, image, description, tags },
  employers,
}) {
  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}vacancies/${slug}`;
  return (
    <Layout metaTitle={title + " | Pershore Times Jobs"} metaDescription={description} ogImage={image}>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <Link
                      href={`/employer/${employer
                        .replace(/ /g, "-")
                        .toLowerCase()}`}
                    >
                      <a className="card-meta-author">
                        {employers.map((employerPage, i) =>
                          employer.replace(/ /g, "-").toLowerCase() ===
                          employerPage.employerSlug ? (
                            <span key={i}>
                              <Image
                                src={employerPage.employerFrontMatter.logo}
                                alt={employer}
                                width="26"
                                height="26"
                                layout="fixed"
                              />
                            </span>
                          ) : (
                            ""
                          )
                        )}
                        <i className="d-inline-block ms-2 ps-1 fst-normal">
                          by <span>{employer}</span>
                        </i>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatDate(date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 mb-3"></div>
            <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
              <Share title={title} pageUrl={pageUrl} />
            </div>
            <div className="col-lg-8 post-content-block order-0 order-lg-2">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
              ></div>
              <ul className="post-meta-tag list-unstyled list-inline mt-5">
                <li className="list-inline-item">Tags: </li>
                {tags.map((t, i) => (
                  <li key={i} className="list-inline-item">
                    <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                      <a className="bg-white">{t}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="single-post-author">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="d-block d-md-flex">
                  <Link
                    href={`/employer/${employer
                      .replace(/ /g, "-")
                      .toLowerCase()}`}
                  >
                    <a>
                      {employers.map((employerPage, i) =>
                        employer.replace(/ /g, "-").toLowerCase() ===
                        employerPage.employerSlug ? (
                          <span key={i}>
                            <Image
                              src={employerPage.employerFrontMatter.logo}
                              alt={employer}
                              width="155"
                              height="155"
                              layout="fixed"
                              className="rounded mr-4"
                              placeholder="blur"
                              blurDataURL={
                                employerPage.employerFrontMatter.logo
                              }
                            />
                          </span>
                        ) : (
                          ""
                        )
                      )}
                    </a>
                  </Link>
                  <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                    <h3 className="h4 mb-3">
                      <Link
                        href={`/employer/${employer
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">{employer}</a>
                      </Link>
                    </h3>
                    {employers.map((employerPage, i) =>
                      employer.replace(/ /g, "-").toLowerCase() ===
                      employerPage.employerSlug ? (
                        <div
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(
                              truncateString(employerPage.employerContent, 150)
                            ),
                          }}
                        ></div>
                      ) : (
                        ""
                      )
                    )}
                    <div className="content">
                      <Link
                        href={`/employer/${employer
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">
                          See all posts by this employer{" "}
                          <i>
                            <IconArrowUpRight size={20} />
                          </i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {useScripts("/js/lightense/lightense.min.js", "body", true)}
    </Layout>
  );
}

export async function getStaticPaths() {
  const vacancyDirFiles = fs.readdirSync(path.join("content/vacancies"));
  const vacancys = vacancyDirFiles.filter((f) => f.includes(".md"));

  const paths = vacancys.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileContents = fs.readFileSync(
    path.join("content/vacancies", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      slug,
      frontMatter: {
        ...frontMatter,
        employer: formatEmployerName(frontMatter.employer),
      },
      content,
      employers: getEmployers(),
    },
  };
}
