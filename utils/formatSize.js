export const formatSize = (s) => {
  switch (s) {
    case "Half":
      return "col-md-6";
    case "Third":
      return "col-lg-4 col-md-6";
    case "Quarter":
      return "col-lg-3 col-md-6";
    default:
      return "col-md-12";
  }
};
