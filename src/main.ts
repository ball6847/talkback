import slugify from '@sindresorhus/slugify';
import { unique } from 'shorthash';
import talkback from 'talkback';

// TODO: ignore authorization header
// TODO: ignore accept gzip header
// TODO: read x-scenario-id header and create/read tape under that directory
// TODO: create better file name for each response
// TODO: ability to specify host at runtime
// TODO: ability to specify RecordMode at runtime

function tapeNameGenerator(tapeNumber: number, tape: any) {
  const url = new URL(tape.req.url, tape.options.host);
  const path = slugify(url.pathname.replace(/^\/api\/v1/, ''));
  const filename = unique(tape.req.url);
  return `${path}/${filename}`;
}

const opts = {
  host: 'https://irpc-web-dashboard-dev.azurewebsites.net',
  record: talkback.Options.RecordMode.NEW,
  port: 5544,
  path: './my-tapes',
  tapeNameGenerator
};
const server = talkback(opts);
server.start(() => console.log('Talkback Started'));
