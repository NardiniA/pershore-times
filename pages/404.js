import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";
import { getConfig } from "@/libs/getConfig";

const error_data = {
  title: "404",
  desc: "Oops. The page you're looking for doesn't exist.",
  button: {
    link: "/",
    text: "Back to home",
  },
};

export default function PageNotFound({ config }) {
  return (
    <Layout metaTitle={"Page Not Found | Upton Times"} config={config}>
      <ErrorPage error={error_data} />
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      config: await getConfig(),
    },
  };
}
