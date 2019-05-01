export function requestDecorator(req: any) {
  delete req.headers["accept-encoding"]
  return req
}
