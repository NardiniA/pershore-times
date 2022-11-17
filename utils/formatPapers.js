export const formatPapers = (date) => {
  const longEnGBFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
  });
  const d = new Date(date);
  return longEnGBFormatter.format(d);
}