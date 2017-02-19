exports.toLower = function (v) {
  return v.toLowerCase();
};

exports.toObfuscate = function (pass) {
  if (!pass) {
    return pass;
  } else {
    let passParsed = "";
    for (var i = 0; i < pass.length; i++) {
      passParsed += '*';
    }
    return passParsed;
  }
};

exports.fixUrl = function(url) {
  if (!url) {
    return url;
  } else {
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
      url = 'http://' + url;
    }

    return url;
  }
};

exports.validatePassword = function(password) {
  return password.length >= 6;
}
