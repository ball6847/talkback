import talkback from "talkback"

type RecordMode = "NEW" | "DISABLED"

export interface ICommandOpts {
  mode: RecordMode
  host: string
  port: number
  path: string
  prefix?: string
}

export function readOptions(argv: { [key: string]: unknown }): ICommandOpts {
  const opts: Partial<ICommandOpts> = {
    mode: "DISABLED",
    port: 5544,
    path: "tapes",
  }

  // TODO: validate valid hostname
  if (!argv.host) {
    throw new Error("--host must be specified")
  } else {
    opts.host = argv.host as string
  }

  if (argv.port) {
    if (/[^\d]/.test(argv.port as string)) {
      throw new Error("--port must be number")
    }
    opts.port = Number(argv.port)
  }

  if (argv.path) {
    opts.path = argv.path as string
  }

  if (argv.mode) {
    if (!["NEW", "IDSABLED"].includes(argv.mode as any)) {
      throw new Error('--mode must be "new" or "disabled"')
    }
    opts.mode = argv.mode as RecordMode
  }

  opts.mode = getTalkbackMode(opts.mode as RecordMode)

  return opts as ICommandOpts
}

// TODO: figure out type of talkback mode
function getTalkbackMode(mode: RecordMode) {
  switch (mode) {
    case "NEW":
      return talkback.Options.RecordMode.NEW
    case "DISABLED":
      return talkback.Options.RecordMode.DISABLED
  }
}
