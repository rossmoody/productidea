exports.handler = async (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: { "2010-12": { 1: "this worked" } },
    }),
  });
};
