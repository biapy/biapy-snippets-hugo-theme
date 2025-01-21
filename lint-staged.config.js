module.exports = {
  "packages.json": "npm audit",
  "*.md": [
    "npx markdownlint-cli",
    "npx cspell lint",
    "docker run --rm --workdir '/docs' --volume '.:/docs:ro' jdkato/vale"
  ],
};
