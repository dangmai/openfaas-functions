"use strict";

const { getUrl } = require("./main");

module.exports = async (event, context) => {
  try {
    const pathPortions = event.path.split("/");
    if (pathPortions.length < 4) {
      throw new Error("not enough parameters");
    }
    const options = {
      includePrerelease: false,
    };
    if (event.query.includePrerelease === "true") {
      options.includePrerelease = true;
    }

    const url = await getUrl(
      pathPortions[1],
      pathPortions[2],
      pathPortions[3],
      options
    );
    return context.status(302).headers({
      Location: url,
    });
  } catch (err) {
    return context.status(400).fail(err);
  }
};
