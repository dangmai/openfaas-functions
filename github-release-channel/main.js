const fetch = require("node-fetch");
const semver = require("semver");

const getUrl = async function (owner, repo, targetVersion, options) {
  const latestVersion = await getLatestRelease(
    owner,
    repo,
    targetVersion,
    options
  );
  return `https://github.com/${owner}/${repo}/releases/tag/${latestVersion}`;
};

const getLatestRelease = async function (owner, repo, targetVersion, options) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases`
  );
  const data = await response.json();
  const versions = data
    .map((release) => release.name)
    .filter((v) => semver.valid(v) !== null)
    .filter((v) => semver.satisfies(v, targetVersion, options));
  versions.sort((v1, v2) => semver.compare(v2, v1, options));
  if (versions.length === 0) {
    throw new Error("No version found");
  }
  return versions[0];
};

exports.getLatestRelease = getLatestRelease;
exports.getUrl = getUrl;
