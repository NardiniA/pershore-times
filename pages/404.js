import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";

const error_data = {
  title: "404",
  desc: "Oops. The page you're looking for doesn't exist.",
  button: {
    link: "/",
    text: "Back to home",
  },
};

export default function PageNotFound() {
  return (
    <Layout metaTitle={"Page Not Found | Pershore Times"}>
      <ErrorPage error={error_data} />
    </Layout>
  );
}
