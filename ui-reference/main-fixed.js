import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './AppFixed.js';

const root=document.getElementById('root');
function showFatal(error){
  try{
    const text=error?.stack||error?.message||String(error||'Unknown browser runtime error');
    let panel=document.getElementById('auran-runtime-error');
    if(!panel){
      panel=document.createElement('div');
      panel.id='auran-runtime-error';
      panel.style.cssText='position:fixed;z-index:99999;left:20px;right:20px;bottom:20px;padding:16px 18px;border-radius:14px;background:#3b0d14;color:#ffe8ec;border:1px solid #7f1d2d;font:13px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;box-shadow:0 20px 60px rgba(0,0,0,.35)';
      document.body.appendChild(panel);
    }
    panel.textContent='AURAN UI runtime error\n'+text;
  }catch{}
}
window.addEventListener('error',e=>showFatal(e.error||e.message));
window.addEventListener('unhandledrejection',e=>showFatal(e.reason));
try{
  createRoot(root,{onUncaughtError:showFatal,onCaughtError:showFatal,onRecoverableError:showFatal}).render(<React.StrictMode><App/></React.StrictMode>);
}catch(error){showFatal(error)}
