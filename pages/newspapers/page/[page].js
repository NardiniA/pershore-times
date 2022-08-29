import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Paper from "@/components/Paper";
import postConfig from "@/config/site.config.json";
import { getPapers } from "@/libs/getPapers";
import fs from "fs";
import path from "path";

export default function Newspaper({ papers, currentPage, numberOfPages }) {
  return (
    <Layout metaTitle="All Newspapers | Pershore Times">
      <PageHeaderBlock title="All newspapers" />

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {papers.map((paper, i) => (
            <div key={i} className="col-lg-6">
              <Paper paper={paper} />
            </div>
          ))}

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} dir="newspapers" />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paperDirFiles = fs.readdirSync(path.join("content/papers"));
  const numberOfPages = Math.ceil(paperDirFiles.length / postConfig.postPerPage);

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
  const paperDirFiles = fs.readdirSync(path.join("content/papers"));
  const papers = paperDirFiles.filter((f) => f.includes(".md"));

  const returnDirFiles = getPapers();

  const page = parseInt(params && params.page) || 1;
  const numberOfPages = Math.ceil(papers.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const orderedPapers = returnDirFiles.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return {
    props: {
      papers: orderedPapers,
      currentPage: page,
      numberOfPages,
    },
  };
}
