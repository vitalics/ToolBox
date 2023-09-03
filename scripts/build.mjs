import { type } from 'node:os';
import { Some } from '@rslike/std';
import { argv, $ } from 'zx';

function mapProcessToCommand() {
  const osType = type();
  switch (osType) {
    case 'Darwin':
      return 'mac';
    case 'Linux':
      return 'linux';
    case 'Windows_NT':
      return 'win';
    default:
      throw new Error(`os "${osType}" is not supported`);
  }
}



/**
 *
 *
 * @param {string} possibleRelease
 * @return {*}
 */
function mapRelease(possibleRelease) {
  if (typeof possibleRelease !== 'string') {
    throw new Error(`release are not a string`);
  }
  const cmd = '--release';
  const supportedOperations = ["onTag", "onTagOrDraft", "always", "never"];

  const findedOperation = supportedOperations.find(el => el === possibleRelease) ?? '';
  if (!findedOperation) {
    throw new Error(`Suported operations: [${supportedOperations}]`, { cause: { value: possibleRelease } });
  }
  return `${cmd} ${findedOperation}`;
}

async function main() {
  const a = Some(argv.release);
  const cmd = mapProcessToCommand();

  const release = a.mapOr('', mapRelease);

  const command = `pnpm build:${cmd} ${release}`;

  await $`${command}`;
}

main();
