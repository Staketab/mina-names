export const getUrlToMinascan = (path: string): string => {
  let domain = "https://t.minascan.io";  
  if (
    document.location.hostname === "localhost" ||
    document.location.hostname === "t-names.minascan.io"
  ) {
    domain = "https://t.minascan.io";
  } else {
    domain = "https://minascan.io";
  }

  return `${domain}${path}`;
};
