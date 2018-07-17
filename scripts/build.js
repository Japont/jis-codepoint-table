const libpath = require('path');
const fs = require('fs-extra');
const pkgDir = require('pkg-dir');

(async () => {
  const rootDir = pkgDir.sync();
  const levelTextSetList = (await Promise.all(
    ['./files/level-01.txt', './files/level-02.txt', './files/level-03.txt', './files/level-04.txt'].map(file =>
      fs.readFile(libpath.join(rootDir, file), 'utf8'),
    ),
  ))
    .map(text => text.split('\n').filter(line => !/^#/.test(line)))
    .map(lines => new Set(lines.join('').slice('')));
  const mappingTableRaw = (await fs.readFile(libpath.join(rootDir, './files/mapping-table.txt'), 'utf8'))
    .split('\n')
    .filter(line => !/^#/.test(line) && !!line.trim())
    .map(line => line.trim().split('\t'));

  const mappingTable = mappingTableRaw.map(info => {
    const [menKuTen, , , codePointText] = info;
    const [, men, ku, ten] = menKuTen.match(/^(\d+)-(\d+)-(\d+)$/).map(num => parseInt(num, 10));
    const fullwidth = info.find(i => i.startsWith('Fullwidth:'));
    const windows = info.find(i => i.startsWith('Windows:'));
    const codePointList = (codePointText ? codePointText.match(/^U\+([a-f0-9]+)(?:\+([a-f0-9]+))?$/i) : [])
      .slice(1)
      .filter(cp => !!cp)
      .map(cp => parseInt(cp, 16));
    const level =
      codePointList[0] && levelTextSetList.findIndex(set => set.has(String.fromCodePoint(codePointList[0])));

    return {
      men,
      ku,
      ten,
      codePoint: codePointList.length >= 2 ? codePointList : codePointList.shift() || undefined,
      fullwidth: fullwidth ? parseInt(fullwidth.match(/U\+([a-f0-9]+)/i)[1], 16) : undefined,
      windows: windows ? parseInt(windows.match(/U\+([a-f0-9]+)/i)[1], 16) : undefined,
      level: level + 1 || undefined,
    };
  });

  // For JSON
  await fs.writeFile(libpath.join(rootDir, './jis-codepoint-table.json'), JSON.stringify(mappingTable), 'utf8');
  // For JavaScript
  await fs.writeFile(
    libpath.join(rootDir, './index.js'),
    `
/*!
 * @japont/jis-codepoint-table
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
module.exports['Table'] = ${JSON.stringify(mappingTable)};
    `.trim(),
    'utf8',
  );
})().catch(console.error);
