// Compute API base URL with dev safety: avoid unsafe browser ports like 6000
let computedBaseUrl = import.meta.env.VITE_API_URL ?? '/api'

if (import.meta.env.DEV) {
  try {
    const url = new URL(computedBaseUrl, window.location.origin)
    const hostname = url.hostname
    const protocol = url.protocol
    const portStr = url.port || (protocol === 'http:' ? '80' : '443')
    const port = Number(portStr)

    // Known unsafe ports in browsers (includes 6000)
    const unsafePorts = new Set([
      1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 69, 77, 79, 87, 95, 101, 102, 103, 104, 109,
      110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179, 389, 427, 465, 512, 513, 514, 515, 526, 530, 531, 532,
      540, 548, 556, 563, 587, 601, 636, 993, 995, 2049, 3659, 4045, 6000, 6665, 6666, 6667, 6668, 6669, 6697,
    ])

    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1'
    if (isLocal && unsafePorts.has(port)) {
      console.warn(
        `[appConfig] VITE_API_URL (${computedBaseUrl}) uses an unsafe browser port (${port}). Falling back to '/api' via Vite proxy in dev.`,
      )
      computedBaseUrl = '/api'
    }
  } catch {
    // If parsing fails, keep default value
  }
}

const appConfig = {
  // In dev, we prefer the Vite proxy unless a safe VITE_API_URL is provided
  apiBaseUrl: computedBaseUrl,
  appName: 'SIGEF',
}

export default appConfig

