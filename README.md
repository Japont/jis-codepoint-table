# @japont/jis-codepoint-table

[![NPM-Badge]][NPM]

[NPM-Badge]: https://img.shields.io/npm/v/@japont/jis-codepoint-table.svg?style=flat-square
[NPM]: https://www.npmjs.com/package/@japont/jis-codepoint-table

> JISX0208/0213 - Unicode table.

## Install

```sh
npm i @japont/jis-codepoint-table
# -- OR --
yarn add @japont/jis-codepoint-table
```

## Usage

```javascript
const { Table } = require("@japont/jis-codepoint-table");

const Level1Chars = Table.filter(i => i.level === 1)
  .map(i => String.fromCodePoint(i.codePoint));
```

### Types

See `index.d.ts`.

```typescript
interface Info {
  men: number;
  ku: number;
  ten: number;
  level?: number;
  codePoint?: number | number[];
  fullwidth?: number;
  windows?: number;
}

var Table: Info[];
```

## Contribute

PRs accepted.

## License

### JIS X 0213:2004 vs Unicode mapping table

- Copyright (C) 2001 earthian@tama.or.jp, All Rights Reserved.
- Copyright (C) 2001 I'O, All Rights Reserved.
- Copyright (C) 2006 Project X0213, All Rights Reserved.

You can use, modify, distribute this table freely.

### Other files

To the extent possible under law, the person who associated CC0 with this has waived all copyright and related or neighboring rights to this.

You should have received a copy of the CC0 legalcode along with this work.
If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
