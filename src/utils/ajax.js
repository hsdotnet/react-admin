import fetch from 'isomorphic-fetch'

const get = (url) => {
  return fetch(url, {
    method: 'GET'
  }).then(response => response.json()).then(json => {
    return json
  }).catch(ex => console.log('parsing failed', ex))
}

const post = function (url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(json => {
    return json
  }).catch(ex => console.log('parsing failed', ex))
}

export default { get, post }