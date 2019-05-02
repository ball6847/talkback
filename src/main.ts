#!/usr/bin/env node
import talkback from "talkback"
import { argv } from "yargs"
import { readOptions } from "./lib/readOptions"
import { requestDecorator } from "./lib/requestDecorator"
import { createTapeNameGenerator } from "./lib/tapeNameGenerator"

const args = readOptions(argv)
const tapeNameGenerator = createTapeNameGenerator(args)

const opts = {
  host: args.host,
  port: args.port,
  path: args.path,
  record: args.mode,
  tapeNameGenerator,
  requestDecorator,
  ignoreHeaders: [
    "authorization",
    "referer",
    "cookie",
    "user-agent",
    "proxy-connection",
    "accept-language",
    "accept",
    "connection",
    "x-devtools-request-id",
  ],
}
const server = talkback(opts)
server.start(() => {
  // tslint:disable-next-line: no-console
  console.log("Talkback Started")
})
