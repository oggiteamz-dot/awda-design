/**
 * build-single.mjs — bundle each page into one self-contained .html.
 *
 * Useful for emailing the design to someone, opening it with no server, or
 * publishing it somewhere that only takes a single file. Needs esbuild:
 *   npx esbuild --version
 *
 * The single-file build swaps the self-hosted @font-face rules for the Google
 * Fonts link, because a one-file page cannot carry sibling font files.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">'
  + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
  + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700'
  + '&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500'
  + '&family=IBM+Plex+Sans:wght@400;500&family=Amiri+Quran&display=swap">';

mkdirSync('dist', { recursive: true });
execFileSync('npx', ['esbuild', 'src/app.js', '--bundle', '--format=iife', '--outfile=dist/.app.js'], { stdio: 'inherit' });

let css = readFileSync('src/core/style.css', 'utf8').replace(/@font-face\{[^}]*\}\n?/g, '');
for (const [a, b] of [['Kufi', "'Noto Kufi Arabic'"], ['Plex', "'IBM Plex Sans Arabic'"],
                      ['Mono', "'IBM Plex Mono'"], ['Quran', "'Amiri Quran'"], ['PlexLat', "'IBM Plex Sans'"]]) {
  css = css.replaceAll('font-family:' + a + ',', 'font-family:' + b + ',').replaceAll('font-family:' + a + ';', 'font-family:' + b + ';');
}
const shell = readFileSync('index.html', 'utf8');
const body = shell.split('<body>')[1].split('<script')[0];
const pageCss = (shell.match(/<style>([\s\S]*?)<\/style>/) || [, ''])[1];
writeFileSync('dist/awda-prototype.single.html',
  `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>عَوْدة · Awda</title>${FONTS}<style>${css}\n${pageCss}</style></head>
<body>${body}<script>${readFileSync('dist/.app.js', 'utf8')}</script></body></html>`);
console.log('wrote dist/awda-prototype.single.html');
