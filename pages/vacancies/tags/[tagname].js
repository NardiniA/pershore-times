import Layout from '@/components/Layout';
import PageHeaderTaxo from '@/components/PageHeaderTaxonomy';
import { getVacancyTagsPaths } from "@/libs/getVacancyTagsPaths";
import { getSingle } from '@/libs/getSingle';
import { getConfig } from '@/libs/getConfig';
import Vacancy from '@/components/Vacancy';

export default function TagSingle({ tag, config }) {
  console.log(tag);
  return (
    <Layout
      metaTitle={`Showing vacancies from - ${tag.Name} | Upton Times`}
      config={config}
    >
      <div className="container">
        <PageHeaderTaxo title={tag.Name} />

        <div className="row open-positions">
          {tag?.vacancies?.data.map((vacancy, index) => (
            <div className="col-lg-6 tagname" key={vacancy?.attributes.Title + index}>
              <Vacancy vacancy={vacancy} />
            </div>
          ))}
          {tag.vacancies?.data.length === 0 && (
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
  const paths = await getVacancyTagsPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { tagname } }) {
  const tag = await getSingle(tagname, "tags-vacancies");

  return {
    props: {
      tag: tag?.attributes,
      config: await getConfig(),
    },
  };
}
