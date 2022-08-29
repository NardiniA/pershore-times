import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import { getPapers } from "@/libs/getPapers";
import { getSinglePage } from "@/libs/getSinglePage";
import { IconArchive } from "@tabler/icons";
import Link from "next/link";

export default function Archive({ papers, archive: { frontMatter } }) {
  // formatDateByYear
  let formatDateByYear = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // formatDateByMonth
  let formatDateByMonth = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
      month: "short",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // sortByYear
  let paperYear = papers.map((year) => formatDateByYear(year.frontMatter.date));
  const uniqueYear = [...new Set(paperYear)];

  return (
    <Layout metaTitle={`${frontMatter.title} Papers`}>
      <PageHeaderTaxo title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              {uniqueYear.map((unqYear, y) => (
                <div className="archive-block" key={y}>
                  <h2>
                    <i>
                      <IconArchive size={80} />
                    </i>
                    {unqYear}
                  </h2>
                  {papers.map((paper, i) =>
                    formatDateByYear(paper.frontMatter.date) === unqYear ? (
                      <div key={i} className="archive-post-item mb-3">
                        <span
                          className="mx-0 d-inline-block"
                          style={{ width: 68 + "px" }}
                        >
                          {formatDateByMonth(paper.frontMatter.date)}
                        </span>
                        <span>•</span>
                        <Link href={`/newspapers/${paper.slug}`}>
                          <a>{paper.frontMatter.title}</a>
                        </Link>
                      </div>
                    ) : null
                  )}
                </div>
              ))}
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
      papers: getPapers(),
      archive: getSinglePage("content/archive.md"),
    },
  };
}
