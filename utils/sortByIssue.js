export const sortByIssue = (a, b) => {
  const issueA = a.frontMatter.issue;
  const issueB = b.frontMatter.issue;

  return issueB - issueA;
};
