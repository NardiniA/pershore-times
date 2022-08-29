import Layout from "@/components/Layout";
import siteConfig from "@/config/site.config.json";
import { formatDatePapers } from "@/utils/formatDate";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandTwitter,
  IconCalendarEvent,
  IconMail,
  IconBrandWhatsapp,
  IconNews,
  IconDownload,
} from "@tabler/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import PaperNavigation from "@/components/PaperNavigation";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function NewspaperPage({
  slug,
  content,
  frontMatter: { title, issue, date, file },
}) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}newspapers/${slug}`;
  return (
    <Layout metaTitle={title + " | Pershore Times"}>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconNews size={18} />
                    </i>
                    <span>Issue {issue}</span>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatDatePapers(date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12"></div>
            <div className="col-lg-6 col-md-10 mb-5">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) =>
                  console.error("React PDF Error: ", error)
                }
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <PaperNavigation
                currentPage={pageNumber}
                numberOfPages={numPages}
                setPageNumber={setPageNumber}
              />
            </div>
            <div className="col-lg-12"></div>
            <div className="col-lg-6 col-md-10">
              <div className="position-sticky" style={{ top: 150 + "px" }}>
                <span className="d-block mb-3 small w-100 text-center">
                  SHARE
                </span>
                <ul className="social-share icon-box text-center">
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandTwitter size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandFacebook size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandLinkedin size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`https://www.reddit.com/submit?url=${pageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandReddit size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`https://www.pinterest.com/pin/create/button/?&text=${title}&url=${pageUrl}&description=${title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandPinterest size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`whatsapp://send?text=${title} - Pershore Times post. Check it out at: ${pageUrl}`}
                    >
                      <i>
                        <IconBrandWhatsapp size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={`mailto:contact@antonionardini.com?subject=${title}&body=Check out this post at ${pageUrl}!`}
                    >
                      <i>
                        <IconMail size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      href={file}
                      download={file}
                    >
                      <i>
                        <IconDownload size={18} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paperDirFiles = fs.readdirSync(path.join("content/papers"));
  const papers = paperDirFiles.filter((f) => f.includes(".md"));

  const paths = papers.map((filename) => ({
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
    path.join("content/papers", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      slug,
      frontMatter,
      content,
    },
  };
}
