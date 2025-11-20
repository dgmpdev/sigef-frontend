const storageService = {
  get: (key) => JSON.parse(window.localStorage.getItem(key) ?? 'null'),
  set: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => window.localStorage.removeItem(key),
}

export default storageService

