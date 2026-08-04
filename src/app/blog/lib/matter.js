/**
 * Minimal front-matter parser for --- YAML blocks.
 * Supports the fields this blog uses: quoted strings and simple string arrays.
 */
export default function matter(fileContents) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(fileContents);

  if (!match) {
    return { data: {}, content: fileContents };
  }

  return {
    data: parseSimpleYaml(match[1]),
    content: match[2],
  };
}

function parseSimpleYaml(yaml) {
  const data = {};

  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    const raw = trimmed.slice(colonIndex + 1).trim();

    data[key] = parseValue(raw);
  }

  return data;
}

function parseValue(raw) {
  if (raw === '') return '';

  if (raw.startsWith('[')) {
    return JSON.parse(raw);
  }

  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }

  return raw;
}
