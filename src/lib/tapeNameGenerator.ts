import slugify from "@sindresorhus/slugify"
import { unique } from "shorthash"
import { URL } from "url"
import { ICommandOpts } from "./readOptions"

const removePrefix = (str: string, prefix?: string) =>
  prefix && str.startsWith(prefix) ? str.substring(prefix.length) : str

export const createTapeNameGenerator = (opts: ICommandOpts) => (tapeNumber: number, tape: any) => {
  const url = new URL(tape.req.url, tape.options.host)
  const scenario = slugify(tape.req.headers["x-scenario-id"] || "unknown-scenario")
  const path = slugify(removePrefix(url.pathname, opts.prefix))
  const filename = unique(tape.req.url)
  return `${scenario}/${path}/${filename}`
}
