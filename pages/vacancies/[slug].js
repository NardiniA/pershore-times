import Layout from "@/components/Layout";
import Link from "next/link";
import { IconArrowDownCircle } from "@tabler/icons";
import { getConfig } from "@/libs/getConfig";
import ApplyForm from "@/components/Form/ApplyForm";
import Share from "@/components/Share";
import { getVacancies } from "@/libs/getVacancies";
import { getSingle } from "@/libs/getSingle";

export default function VacancyPage({
  slug,
  page: { attributes: { Title, employer, tags, Content, ApplicationDestination } },
  config,
}) {
  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/vacancies/${slug}`;
  return (
    <Layout metaTitle={`${Title} | Upton Times`} config={config}>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p className="mb-2">{employer?.data?.attributes.Name}</p>
              <h1 className="section-title h2 mb-3">
                <span>{Title}</span>
              </h1>
              <ul className="list-inline breadcrumb-menu actions mb-4">
                <li className="list-inline-item">
                  <Link href="#applicationForm">
                    <a>
                      <span className="ms-1 me-2">Apply for this Job</span>
                      <i
                        className="d-inline-block text-dark"
                        style={{ transform: "translateY(-" + 2 + "px)" }}
                      >
                        <IconArrowDownCircle size={16} />
                      </i>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row justify-content-center">
                <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
                  <Share title={Title} pageUrl={pageUrl} />
                </div>
                <div className="col-lg-9">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: Content,
                    }}
                  ></div>
                  <ul className="post-meta-tag list-unstyled list-inline mt-5">
                    <li className="list-inline-item">Tags: </li>
                    {tags?.data.map((t, i) => (
                      <li key={i} className="list-inline-item">
                        <Link
                          href={`/vacancies/tags/${t?.attributes.Slug.toLowerCase()}`}
                        >
                          <a className="bg-white">{t?.attributes.Name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm pt-3" id="applicationForm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ApplyForm destination={ApplicationDestination} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const employers = await getVacancies();

  let paths = [];

  if (employers) {
    paths = employers.map((employ) => ({
      params: {
        slug: employ.slug,
      },
    }));
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const page = await getSingle(slug, "vacancies");
  return {
    props: {
      slug,
      page,
      config: await getConfig(),
    },
  };
}
