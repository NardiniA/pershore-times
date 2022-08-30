import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import { formatAuthorName } from "@/libs/formatAuthorName";
import { getAuthors } from "@/libs/getAuthors";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import {
  IconArrowUpRight,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import Share from "@/components/Share";

export default function PostPage({
  slug,
  content,
  frontMatter: { title, author, date, image, description, tags },
  authors,
}) {
  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;
  return (
    <Layout metaTitle={title} metaDescription={description} ogImage={image}>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <Link
                      href={`/author/${author
                        .replace(/ /g, "-")
                        .toLowerCase()}`}
                    >
                      <a className="card-meta-author">
                        {authors.map((authorPage, i) =>
                          author.replace(/ /g, "-").toLowerCase() ===
                          authorPage.authorSlug ? (
                            <span key={i}>
                              <Image
                                src={authorPage.authorFrontMatter.image}
                                alt={author}
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
                          by <span>{author}</span>
                        </i>
                      </a>
                    </Link>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconClock size={18} />
                    </i>
                    <span>{readingTime(content)} min read</span>
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
            <div className="col-lg-12">
              <div className="mb-5 text-center post-deatils-image">
                <Image
                  className="rounded w-100"
                  src={image}
                  alt={title}
                  width={`1120`}
                  height={`595`}
                  placeholder="blur"
                  blurDataURL={image}
                />
              </div>
            </div>
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
                    href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}
                  >
                    <a>
                      {authors.map((authorPage, i) =>
                        author.replace(/ /g, "-").toLowerCase() ===
                        authorPage.authorSlug ? (
                          <span key={i}>
                            <Image
                              src={authorPage.authorFrontMatter.image}
                              alt={author}
                              width="155"
                              height="155"
                              layout="fixed"
                              className="rounded mr-4"
                              placeholder="blur"
                              blurDataURL={authorPage.authorFrontMatter.image}
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
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">{author}</a>
                      </Link>
                    </h3>
                    {authors.map((authorPage, i) =>
                      author.replace(/ /g, "-").toLowerCase() ===
                      authorPage.authorSlug ? (
                        <div
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(
                              truncateString(authorPage.authorContent, 150)
                            ),
                          }}
                        ></div>
                      ) : (
                        ""
                      )
                    )}
                    <div className="content">
                      <Link
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">
                          See all posts by this author{" "}
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
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter((f) => f.includes(".md"));

  const paths = blogs.map((filename) => ({
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
    path.join("content/blog", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      slug,
      frontMatter: {
        ...frontMatter,
        author: formatAuthorName(frontMatter.author),
      },
      content,
      authors: getAuthors(),
    },
  };
}
