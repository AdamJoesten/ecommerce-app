import pino from 'pino'

type Format = "pretty" | "json"
type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

const transportFactory = (format: Format) => {
  switch (format) {
    case "pretty":
      return pino.transport({
        target: "pino-pretty"
      })
    case "json":
      return undefined
    default:
      throw Error() // TODO: How do we maintain Liskov Substitution Principle here with error types?
  }
}

export const loggerFactory = (level: LogLevel = "info", format: Format = "json") => pino({ level }, transportFactory(format))

