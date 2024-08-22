import pino, { Logger } from "pino";

export const logger: Logger =
  process.env["NODE_ENV"] === "production"
    ? // JSON in production
      pino({ 
        transport: {
            target: 'pino-roll',
            options: { 
                file: process.env.LOGIN_PATH, 
                frequency: 'hourly', 
                mkdir: true 
            },
            level: 'info | warn | error'
        },
      })
      : // Pretty print in development
        pino({
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
            level: 'info | warn | error'
          },
        });