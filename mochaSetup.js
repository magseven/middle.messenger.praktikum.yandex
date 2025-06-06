/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';

//Error.stackTraceLimit = 8;

const jsdom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>', {
    url: 'http://localhost:8080/'
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.HTMLElement = jsdom.window.HTMLElement;
