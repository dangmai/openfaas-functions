"use strict";

const { getUrl } = require("./main");

module.exports = async (event, context) => {
  try {
    console.log(event.path);
    console.log(event.query);
    const url = await getUrl("rancher", "k3os", "~0.21.0", {
      includePrerelease: true,
    });
    return context.status(302).headers({
      Location: url,
    });
  } catch (err) {
    return context.status(400).fail(err);
  }
};
