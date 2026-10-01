import React from 'react';
import {renderToString} from 'react-dom/server';
import {writeFileSync} from 'node:fs';
import App from './AppFixed.js';

globalThis.window={
  location:{hash:'#/dashboard'},
  addEventListener(){},removeEventListener(){},scrollTo(){},
  clearTimeout:globalThis.clearTimeout,setTimeout:globalThis.setTimeout,
  localStorage:{getItem(){return null},setItem(){},removeItem(){}}
};
globalThis.localStorage=globalThis.window.localStorage;

const html=renderToString(<App/>);
if(!html || !html.includes('AURAN')){
  throw new Error('AURAN UI SSR smoke test produced no application markup');
}
writeFileSync('/tmp/auran-ssr.html',html,'utf8');
console.log('SSR smoke test OK, rendered bytes:',Buffer.byteLength(html));
