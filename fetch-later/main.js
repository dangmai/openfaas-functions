const fs = require("fs").promises;
const fetch = require("node-fetch");

const fetchLater = async function (localPath, timeout, interval, url, method) {
  const start = Date.now();
  let now = Date.now();
  let found = false;
  while (now - start <= timeout) {
    try {
      await fs.stat(localPath);
      found = true;
      console.info(`Path ${localPath} found!`);
      break;
    } catch (err) {
      console.debug(`Path ${localPath} doesn't exist yet, sleeping...`);
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
    now = Date.now();
  }
  if (!found) {
    throw new Error(`Timed out while waiting for ${localPath} to be available`);
  }
  await fetch(url, {
    method,
  });
};

exports.fetchLater = fetchLater;
