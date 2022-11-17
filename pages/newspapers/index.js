import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import { getConfig } from "@/libs/getConfig";
import { getPapers } from "@/libs/getPapers";
import { formatPapers } from "@/utils/formatPapers";
import { IconArchive } from "@tabler/icons";
import Link from "next/link";

export default function Archive({ papers, config }) {
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
  let paperYear = papers.map((year) => formatDateByYear(year.date));
  const uniqueYear = [...new Set(paperYear)];

  return (
    <Layout metaTitle={` Upton Newspapers | Pershore Times`} config={config}>
      <PageHeaderTaxo title="Upton Newspapers" />

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
                    formatDateByYear(paper.date) === unqYear ? (
                      <div key={i} className="archive-post-item mb-3">
                        <span
                          className="mx-0 d-inline-block"
                          style={{ width: 68 + "px" }}
                        >
                          {formatDateByMonth(paper.date)}
                        </span>
                        <span>•</span>
                        <Link href={`/newspapers/${paper.issue}`}>
                          <a>{`Issue ${paper.issue} - ${formatPapers(
                            paper.date
                          )}`}</a>
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
      papers: await getPapers(),
      config: await getConfig(),
    },
  };
}
