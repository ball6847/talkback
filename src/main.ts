import talkback from 'talkback';
import { tapeNameGenerator } from './libs/tapeNameGenerator';

// TODO: ignore accept gzip header (need modification to 3rdparty module)
// TODO: ability to specify host at runtime
// TODO: ability to specify RecordMode at runtime

const opts = {
  host: 'https://irpc-web-dashboard-dev.azurewebsites.net',
  record: talkback.Options.RecordMode.NEW,
  port: 5544,
  path: './my-tapes',
  tapeNameGenerator,
  ignoreHeaders: ['authorization']
};
const server = talkback(opts);
server.start(() => console.log('Talkback Started'));
