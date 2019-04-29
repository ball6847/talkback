import slugify from '@sindresorhus/slugify';
import { unique } from 'shorthash';

export function tapeNameGenerator(tapeNumber: number, tape: any) {
  const url = new URL(tape.req.url, tape.options.host);
  const scenarioId = slugify(tape.req.headers['x-scenario-id'] || 'unknown-scenario');
  const path = slugify(url.pathname.replace(/^\/api\/v1/, ''));
  const filename = unique(tape.req.url);
  return `${scenarioId}/${path}/${filename}`;
}
