import Layout from "@/components/Layout";
import { getPosts } from "@/libs/getPosts";
import { getAuthors } from "@/libs/getAuthors";
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import BlockZone from "@/components/BlockZone";

export default function Slug({ frontMatter, posts, authors }) {
    return (
      <Layout
        metaTitle={frontMatter.title + " | Pershore Times"}
        metaDescription={frontMatter.description}
      >
        <section>
          <div className="container">
            <BlockZone sections={frontMatter?.sections} posts={posts} authors={authors} />
          </div>
        </section>
      </Layout>
    );
}

export async function getStaticPaths() {
  const pageDirFiles = fs.readdirSync(join("content/pages"));
  const pages = pageDirFiles.filter((f) => f.includes(".md"));

  const paths = pages.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileContents = fs.readFileSync(
    join("content/pages", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter } = matter(fileContents);

  return {
    props: {
      frontMatter,
      posts: getPosts(),
      authors: getAuthors(),
    },
  };
}
