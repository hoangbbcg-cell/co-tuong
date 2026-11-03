type Counter = {
  windowStart: number
  requests: number
}

const counters = new WeakMap<object, Counter>()

export function allowSocketEvent(socket: object, now = Date.now()): boolean {
  let counter = counters.get(socket)

  if (!counter) {
    counter = { windowStart: now, requests: 0 }
    counters.set(socket, counter)
  }

  if (now - counter.windowStart >= 1000) {
    counter.windowStart = now
    counter.requests = 0
  }

  counter.requests++
  return counter.requests <= 20
}
