import { sortByDate } from "@/utils/sortByDate";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { formatEmployerName } from "./formatEmployerName";

const vacancyDirFiles = fs.readdirSync(path.join("content/vacancies"));
const vacancys = vacancyDirFiles.filter((f) => f.includes(".md"));

export function getJobs() {
  const returnDirFiles = vacancys.map((filename) => {
    const slug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/vacancies", filename),
      "utf8"
    );

    const { data: frontMatter, content } = matter(dirFileContents);

    return {
      slug,
      frontMatter: {
        ...frontMatter,
        employer: formatEmployerName(frontMatter.employer),
      },
      content,
    };
  });
  return returnDirFiles.sort(sortByDate);
}
