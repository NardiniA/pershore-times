import Layout from "@/components/Layout";
import { getConfig } from "@/libs/getConfig";
import { getEmployers } from "@/libs/getEmployers";
import { getSingle } from "@/libs/getSingle";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import Vacancy from "@/components/Vacancy";

export default function EmployersPage({
    slug,
    page: { attributes: { Name, Slug, vacancies } },
    config,
}) {
    return (
      <Layout metaTitle={`${Name} | Upton Times`} config={config}>
        <div className="container">
          <PageHeaderTaxo title={Name} />

          <div className="row open-positions">
            {vacancies?.data.map((vacancy, index) => (
              <div
                className="col-lg-6 tagname"
                key={vacancy?.attributes.Title + index}
              >
                <Vacancy vacancy={vacancy} />
              </div>
            ))}
            {vacancies?.data.length === 0 && (
              <div className="col-lg-12 text-center">
                <h3>No Vacancies Available</h3>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
}

export async function getStaticPaths() {
    const employers = await getEmployers();

    if (employers) {
        const paths = employers.map((e) => ({
            params: {
                slug: e.slug,
            },
        }));

        return {
            paths,
            fallback: false,
        };
    }
    return {
        paths: [],
        fallback: false,
    };;
}

export async function getStaticProps({ params: { slug } }) {
    const config = await getConfig();

    return {
        props: {
            slug,
            page: await getSingle(slug, "employers"),
            config,
        },
    };
}
