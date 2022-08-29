import { sortByIssue } from "@/utils/sortByIssue";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const paperDirFiles = fs.readdirSync(join("content/papers"));
const papers = paperDirFiles.filter((f) => f.includes(".md"));

export function getPapers() {
  const returnDirFiles = papers.map((filename) => {
    const slug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      join("content/papers", filename),
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
