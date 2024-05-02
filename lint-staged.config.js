module.exports = {
  "packages.json": "npm audit",
  "*.md": ["npx markdownlint-cli", "npx cspell lint", "vale"],
};
