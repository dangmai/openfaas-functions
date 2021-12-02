"use strict";

const { fetchLater } = require("./main");

module.exports = async (event, context) => {
  try {
    console.info(event.body);
    const req = JSON.parse(event.body);
    await fetchLater(
      req.localPath,
      req.timeout,
      req.interval,
      req.url,
      req.method
    );
    return context.status(200).succeed("Successful");
  } catch (err) {
    return context.status(400).fail(err);
  }
};
