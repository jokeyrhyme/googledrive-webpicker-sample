'use strict';

// foreign modules

import load from '@jokeyrhyme/load';
import pollUntil from 'poll-until';

// this module

const TIMEOUT = 10e3;

let getScript = function () {
  const URL = 'https://apis.google.com/js/client.js';
  return new Promise((resolve, reject) => {
    load(URL, (err) => {
      if (err) {
        reject(err);
        return;
      }
      getScript = () => Promise.resolve();
      resolve();
    });
  });
};

let awaitGapi = function () {
  return new Promise((resolve, reject) => {
    let timer;
    const stop = pollUntil(() => {
      return global.gapi && global.gapi.auth && global.gapi.client;
    }, 200, () => {
      clearTimeout(timer);
      awaitGapi = () => Promise.resolve();
      resolve();
    });
    timer = setTimeout(() => {
      stop();
      reject(new Error('10 seconds and still no Google :S'));
    }, TIMEOUT);
  });
};

export default function getGapi () {
  return getScript()
  .then(() => {
    return awaitGapi();
  })
  .then(() => {
    return global.gapi;
  });
}
