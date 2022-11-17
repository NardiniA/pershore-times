import Layout from "@/components/Layout";
import ErrorPage from "@/components/ErrorPage";
import { getStaticProps } from "./404";

const error_data = {
    title: "500",
    desc: "Oops. There seems to have been a server error. Please try again later.",
    button: {
        text: "Reload Page",
        onClick: (e) => {
            e.preventDefault();
            if (window) window.location.reload();
        }
    }
}

export default function ServerError({ config }) {
  return (
    <Layout metaTitle={"Server Error | Upton Times"} config={config}>
        <ErrorPage error={error_data} />
    </Layout>
  );
}

export { getStaticProps };
