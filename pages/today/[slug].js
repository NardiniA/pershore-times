import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import {
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import Share from "@/components/Share";
import { getSingle } from "@/libs/getSingle";
import { getPostsPaths } from "@/libs/getPostsPaths";
import { getConfig } from "@/libs/getConfig";

export default function PostPage({
  page: { attributes: { Title, Slug, Excerpt, Date, Image: { data: { attributes: { url, width, height }}}, Alt, Body, tags } },
  config
}) {
  let pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/today/${Slug}`;
  return (
    <Layout
      metaTitle={Title}
      metaDescription={Excerpt}
      ogImage={url}
      config={config}
    >
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="mb-5">
                <h3 className="h1 mb-4 post-title">{Title}</h3>

                <ul className="card-meta list-inline mb-2">
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconClock size={18} />
                    </i>
                    <span>{readingTime(Body)} min read</span>
                  </li>
                  <li className="list-inline-item mt-2">—</li>
                  <li className="list-inline-item mt-2">
                    <i className="me-2">
                      <IconCalendarEvent size={18} />
                    </i>
                    <span>{formatDate(Date)}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="mb-5 text-center post-deatils-image">
                <Image
                  className="rounded w-100"
                  src={url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                  alt={Alt}
                  width={width}
                  height={height}
                  placeholder="blur"
                  blurDataURL={url.replace(
                    "https://res.cloudinary.com/antonio-nardini/image/upload",
                    ""
                  )}
                />
              </div>
            </div>
            <div className="col-lg-2 post-share-block order-1 order-lg-0 mt-5 mt-lg-0">
              <Share title={Title} pageUrl={pageUrl} />
            </div>
            <div className="col-lg-8 post-content-block order-0 order-lg-2">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: Body }}
              ></div>
              <ul className="post-meta-tag list-unstyled list-inline mt-5">
                <li className="list-inline-item">Tags: </li>
                {tags?.data.map((t, i) => (
                  <li key={i} className="list-inline-item">
                    <Link href={`/today/tags/${t?.attributes.Slug.toLowerCase()}`}>
                      <a className="bg-white">{t?.attributes.Name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {useScripts("/js/lightense/lightense.min.js", "body", true)}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPostsPaths();

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      page: await getSingle(slug, "blogs"),
      config: await getConfig()
    }
  }
}
