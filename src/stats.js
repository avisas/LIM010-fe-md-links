const uniquesLinks = (arrayOfLinks) => {
  const countUniqueLinks = new Set(arrayOfLinks.map((link) => link.href));
  return countUniqueLinks.size;
};

const brokenLinks = (arrayOfLinks) => {
  const countBrokenLinks = arrayOfLinks.filter((link) => link.statusText === 'FAIL').length;
  return countBrokenLinks;
};

module.exports = {
  uniquesLinks,
  brokenLinks,
};
