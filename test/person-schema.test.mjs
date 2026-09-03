import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('person JSON-LD has machine-readable identity fields', () => {
  const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const schemas = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
    .map(([, value]) => JSON.parse(value));
  const person = schemas.find((schema) => schema['@type'] === 'Person');

  assert.deepEqual(
    {
      name: person?.name,
      description: person?.description,
      jobTitle: person?.jobTitle,
      url: person?.url,
      sameAs: person?.sameAs,
    },
    {
      name: 'James King',
      description: 'AI-Augmented Software Engineer specializing in AI code governance, secure web development, and technical leadership.',
      jobTitle: 'AI-Augmented Software Engineer',
      url: 'https://jamesking.dev',
      sameAs: [
        'https://github.com/Jamesking56',
        'https://linkedin.com/in/jamesking56',
      ],
    },
  );
});
