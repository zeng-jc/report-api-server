module.exports = (req, res, next) => {
  res.sendResult = (data, code, message) => {
    let result = {};
    if (code === 200) {
      result = {
        data,
        status: code,
        message,
      };
    } else {
      result = {
        status: code,
        message,
      };
    }
    res.send(result);
  };
  next();
};
