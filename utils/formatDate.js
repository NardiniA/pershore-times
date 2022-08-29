export const formatDate = (a) => {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const date = new Date(a);
  return longEnUSFormatter.format(date);
};

export const formatDatePapers = (a) => {
  const longEnGBFormatter = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "short"
  });
  const date = new Date(a);
  return longEnGBFormatter.format(date);
}
