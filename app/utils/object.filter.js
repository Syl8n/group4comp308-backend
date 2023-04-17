function removeUndefinedValue(obj) {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] === Object(obj[key])) {
      newObj[key] = removeUndefinedValue(obj[key]);
    }

    else if (obj[key]) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}

module.exports = function(obj) {
  return removeUndefinedValue(obj);
}