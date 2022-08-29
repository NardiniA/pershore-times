import Layout from "@/components/Layout";
import { getPosts } from "@/libs/getPosts";
import { getPaper } from "@/libs/getPaper";
import { getAuthors } from "@/libs/getAuthors";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import BlockZone from "@/components/BlockZone";

export default function Slug({ frontMatter, posts, authors, papers }) {
    return (
      <Layout
        metaTitle={frontMatter.title + " | Pershore Times"}
        metaDescription={frontMatter.description}
      >
        <section>
          <div className="container">
            <BlockZone sections={frontMatter?.sections} posts={posts} papers={papers} authors={authors} />
          </div>
        </section>
      </Layout>
    );
}

export async function getStaticPaths() {
  const pageDirFiles = fs.readdirSync(path.join("content/pages"));
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
    path.join("content/pages", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter } = matter(fileContents);

  return {
    props: {
      frontMatter,
      posts: getPosts(),
      authors: getAuthors(),
      papers: getPaper(),
    },
  };
}
