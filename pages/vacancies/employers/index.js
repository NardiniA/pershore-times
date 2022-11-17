import Link from "next/link";
import PageHeaderBlock from "@/components/PageHeader";
import Layout from "@/components/Layout";
import { IconUsers } from "@tabler/icons";
import { getConfig } from "@/libs/getConfig";
import { getEmployers } from "@/libs/getEmployers";

export default function Employers({ employers, config }) {
  return (
    <Layout metaTitle="All Employers | Upton Times" config={config}>
      <PageHeaderBlock title="All employers" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {employers.map((e, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link href={`/vacancies/employers/${e.slug}`}>
                <a className="p-4 rounded bg-white d-block is-hoverable">
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconUsers size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{e.name}</span>
                  Total {e?.vacancies?.data.length} vacanc{e?.vacancies?.data.length > 1 ? "ies" : "y"}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
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
