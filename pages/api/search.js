/* eslint-disable import/no-anonymous-default-export */
import { formatAuthorName } from "@/libs/formatAuthorName";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // Fetch cache data
    posts = require("../../cache/data").posts;
  } else {
    const blogDirFiles = fs.readdirSync(path.join("content/blog/posts"));
    const blogs = blogDirFiles.filter((f) => f.includes(".md"));

    posts = blogs.map((filename) => {
      const slug = filename.replace(".md", "");
      const dirFileContents = fs.readFileSync(
        path.join("content/blog/posts", filename),
        "utf8"
      );

      const { data: frontMatter } = matter(dirFileContents);

      return {
        slug,
        frontMatter: {
          ...frontMatter,
          author: formatAuthorName(frontMatter.author),
        },
      };
    });
  }

  res.status(200).json(JSON.stringify(posts));
};
