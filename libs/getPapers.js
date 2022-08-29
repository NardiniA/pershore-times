import { sortByIssue } from "@/utils/sortByIssue";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const paperDirFiles = fs.readdirSync(path.join("content/papers"));
const papers = paperDirFiles.filter((f) => f.includes(".md"));

export function getPapers() {
  const returnDirFiles = papers.map((filename) => {
    const slug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/papers", filename),
      "utf8"
    );

    const { data: frontMatter, content } = matter(dirFileContents);

    return {
      slug,
      frontMatter,
      content,
    };
  });
  return returnDirFiles.sort(sortByIssue);
}
