export const sortByIssue = (a, b) => {
  const issueA = a.issue;
  const issueB = b.issue;

  return issueB - issueA;
};
