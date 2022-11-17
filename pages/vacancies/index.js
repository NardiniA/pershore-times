import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import { getConfig } from "@/libs/getConfig";
import { getEmployers } from "@/libs/getEmployers";
import Link from "next/link";

export default function VacancyPage({ employers, config }) {
    console.log(employers[0].vacancies?.data[0].attributes.tags);
  return (
    <Layout metaTitle={` Vacancies | Upton Times`} config={config}>
      <PageHeaderTaxo title="Vacancies" />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              {employers.map((employer, i) => (
                <div className="row justify-content-center pt-3" key={employer.name + i}>
                    <div className="col-md-5 mb-4 mb-md-0">
                        <h3 className="text-dark">{employer.name}</h3>
                    </div>
                    <div className="col-md-6">
                        <div className="open-positions pl-0 pl-md-5">
                            {employer?.vacancies?.data.map((vacancy, index) => (
                                <Link href={`/vacancies/${vacancy?.attributes.Slug}`} key={vacancy?.attributes.Title + index}>
                                    <a className="text-dark d-block">
                                        <h4>{vacancy?.attributes.Title}</h4>
                                        <span>{vacancy?.attributes?.tags?.data.map((tag, j) => {
                                            if (vacancy?.attributes?.tags?.data.length - 1 !== j) return tag?.attributes.Name + ", ";
                                            return tag?.attributes.Name;
                                        }).join()}</span>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
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
        employers: await getEmployers(),
        config: await getConfig(),
    },
  };
}
