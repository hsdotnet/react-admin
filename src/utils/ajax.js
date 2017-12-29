import fetch from 'isomorphic-fetch'

const get = (url, callback) => {
  fetch(url).then((response) => response.json())
    .then((data) => {
      callback(data);
    })
}

const post = function (url, data, callback) {
  var fetchOptions = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  fetch(url, fetchOptions).then((response) => response.json())
    .then((data) => {
      callback(data);
    })
}

export default { get, post }