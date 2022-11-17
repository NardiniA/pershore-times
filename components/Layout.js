import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import siteConfig from "@/config/site.config.json";

export default function Layout({
  metaTitle,
  metaDescription,
  metaAuthor,
  metaKeyword,
  ogImage,
  config,
  children,
}) {
  const title = metaTitle || config?.config?.SEO.Title;
  const description = metaDescription || config?.config?.SEO.Description;
  const author = metaAuthor || config?.config?.SEO.Author;
  const image = ogImage || config?.config?.SEO?.Image?.data?.attributes.url;
  const keywords = metaKeyword || config?.config?.SEO.Keywords;
  const width = siteConfig?.metaData.imageWidth || config?.config?.SEO?.Image?.data?.attributes.width;
  const height = siteConfig?.metaData.imageHeight || config?.config?.SEO?.Image?.data?.attributes.height;
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <title>{title}</title>

        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keyword" content={keywords} />
        <meta name="author" content={author} />
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:height" content={height} />
        <meta property="og:image:width" content={width} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#fff0f0" />
        <meta name="theme-color" content="#fff0f0" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {config && <Header menu={config?.menu} tags={config?.tags} config={config?.config} />}

      {children}

      <Footer config={config?.config} />
    </>
  );
}

Layout.defaultProps = {
  metaTitle: siteConfig?.metaData.title,
  metaDescription: siteConfig?.metaData.description,
  author: siteConfig?.metaData.author,
  keywords: siteConfig?.metaData.keyword,
  ogImage: siteConfig?.metaData.ogImage
}
