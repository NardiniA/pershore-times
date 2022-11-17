import Layout from "@/components/Layout";
import { formatPapers } from "@/utils/formatPapers";
import {
  IconCalendarEvent,
  IconNews,
} from "@tabler/icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import PaperNavigation from "@/components/PaperNavigation";
import { getPapers } from "@/libs/getPapers";
import { getSinglePaper } from "@/libs/getSinglePaper";
import { getConfig } from "@/libs/getConfig";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function NewspaperPage({
  slug,
  page: {
    attributes: { Issue, Date, File }
  },
  config
}) {
  const [loaded, setLoaded] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setLoaded(true);
    setNumPages(numPages);
  }

  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newspapers/${slug}`;
  const title = `Issue ${Issue} - ${formatPapers(Date)}`;

  return (
    <Layout metaTitle={title + " | Pershore Times"} config={config}>
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
                    <span>Issue {Issue}</span>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatPapers(Date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12"></div>
            <div className="col-lg-6 col-md-10 mb-5">
              <div className={`paper-container ${loaded && "loaded"}`}>
                <div className="paper-loader">
                  <svg viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20"></circle>
                  </svg>
                </div>

                <Document
                  file={File?.data?.attributes.url}
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
            </div>
            <div className="col-lg-12"></div>
            <div className="col-lg-6 col-md-10">
              <Share title={title} pageUrl={pageUrl} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const papers = await getPapers();

  const paths = papers.map((paper) => ({
    params: {
      id: paper.issue + "",
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const page = await getSinglePaper(id, "newspapers-upton");
  
  return {
    props: {
      slug: id + "",
      page,
      config: await getConfig(),
    },
  };
}
