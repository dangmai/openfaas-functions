jest.mock("node-fetch");

const fetch = require("node-fetch");
const { fetchLater } = require("./main");

test("fetch right away when file exists", async () => {
  await fetchLater(__filename, 1000, 500, "https://google.com", "POST");
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith("https://google.com", {
    method: "POST",
  });
});

test("times out when file doesn't exist", async () => {
  await expect(
    fetchLater(
      __dirname + "/nonexistent.json",
      100,
      50,
      "https://google.com",
      "POST"
    )
  ).rejects.toThrow();
});
