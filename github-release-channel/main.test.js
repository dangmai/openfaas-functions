const semver = require("semver");
const { getLatestRelease } = require("./main");

test("check latest k3os release in 0.21 series", async () => {
  const latestRelease = await getLatestRelease("rancher", "k3os", "~0.21.1", {
    includePrerelease: true,
  });
  expect(semver.major(latestRelease)).toBe(0);
  expect(semver.minor(latestRelease)).toBe(21);
  expect(semver.patch(latestRelease)).toBeGreaterThan(1);
});

test("check exact k3os release", async () => {
  const latestRelease = await getLatestRelease(
    "rancher",
    "k3os",
    "v0.21.5-k3s2r1",
    {
      includePrerelease: true,
    }
  );
  expect(latestRelease).toBe("v0.21.5-k3s2r1");
});
