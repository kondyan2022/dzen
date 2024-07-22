const generateCacheKey = (req, prefix) => {
  const { path, query, baseUrl } = req;
  const queryString = Object.keys(query)
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join("&");
  if (prefix) {
    return `${prefix}:${baseUrl}${path}?${queryString}`;
  }
  return `${baseUrl}${path}?${queryString}`;
};

module.exports = generateCacheKey;
