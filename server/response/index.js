let getResponse = (
  errors,
  result,
  successStatus = 200,
  failureStatus = 400
) => {
  if (errors.length == 0) {
    return {
      status: successStatus,
      result,
    };
  } else {
    return {
      status: failureStatus,
      errors,
    };
  }
};
module.exports = {
  getResponse,
};
