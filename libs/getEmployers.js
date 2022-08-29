import fs from "fs";
import matter from "gray-matter";
import path from "path";

const employerDirFiles = fs.readdirSync(path.join("content/employers"));
const employers = employerDirFiles.filter((f) => f.includes(".md"));

export function getEmployers() {
  const returnDirFiles = employers.map((filename) => {
    const employerSlug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/employers", filename),
      "utf-8"
    );
    const { data: employerFrontMatter, content } = matter(dirFileContents);

    return {
      employerSlug,
      employerFrontMatter,
      employerContent: content,
    };
  });
  return returnDirFiles;
}
