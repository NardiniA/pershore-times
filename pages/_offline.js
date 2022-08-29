import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";

const error_data = {
  title: "Offline",
  desc: "Seems you are offline. Check your internet connection and try again.",
  button: {
    text: "Reload",
    onClick: (e) => {
        e.preventDefault();
        if (window) window.location.reload();
    }
  },
};

export default function Offline() {
  return (
    <Layout metaTitle={"Unable to connect | Pershore Times"}>
      <ErrorPage error={error_data} />
    </Layout>
  );
}
