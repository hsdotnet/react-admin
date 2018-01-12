import fetch from 'isomorphic-fetch'

const getUrl = (url, data) => {
  let params = []
  Object.keys(data).forEach(function (key) {
    params.push(`${key}=${data[key]}`)
  })
  return url + (url.indexOf('?') > 0 ? '&' : '?') + params.join('&')
}

const get = (url, data) => {
  url = getUrl(url, data)

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