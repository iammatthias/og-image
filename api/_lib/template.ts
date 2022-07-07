import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
<<<<<<< HEAD
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString("base64");
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString("base64");

function getCss(theme: string, fontSize: string) {
  let background = "white";
  let foreground = "black";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
  }
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 50% 50%, rgba(249, 254, 255, 1), rgba(253, 255, 252, .2)), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-size: cover;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
=======

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString("base64");

function getCss(fontSize: string) {
  let foreground = "black";

  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
>>>>>>> ea371eb9bc7c0e272c5df5f14113b8e63f028f70
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: radial-gradient(circle at 50% 50%, rgba(249, 254, 255, 1), rgba(253, 255, 252, .2)), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-size: cover;
    }

    .contentWrapper {
        minHeight: 100vh;
        minWidth: 100vw;
        height: 100%;
        width: 100%;
    }

    .logo-wrapper {
        position: absolute;
        top: 100px;
        left: 100px;
    }

    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: bold;
        color: ${foreground};
        line-height: 1;
        position: absolute;
        bottom: 120px;
        left: 100px;
        right: 100px;
    }
    
    .subHeading {
        font-family: 'Inter', sans-serif;
        font-size: 40px;
        font-style: normal;
        color: ${foreground};
<<<<<<< HEAD
        line-height: 1.8;
=======
        line-height: 1;
        position: absolute;
        bottom: 100px;
        left: 100px;
        right: 100px;
>>>>>>> ea371eb9bc7c0e272c5df5f14113b8e63f028f70
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
<<<<<<< HEAD
  const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
=======
  const { text, md, fontSize, images, widths, heights } = parsedReq;
>>>>>>> ea371eb9bc7c0e272c5df5f14113b8e63f028f70
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
<<<<<<< HEAD
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images.map((img, i) => getPlusSign(i) + getImage(img, widths[i], heights[i])).join("")}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(md ? marked(text) : sanitizeHtml(text))}
            </div>
        </div>
=======
    <div class="logo-wrapper">
        ${images.map((img, i) => getPlusSign(i) + getImage(img, widths[i], heights[i])).join("")}
    </div>

    <div class="heading">${md ? marked(text) : sanitizeHtml(text)}</div>
    <div class="subHeading">iammatthias.com</div>
>>>>>>> ea371eb9bc7c0e272c5df5f14113b8e63f028f70
    </body>
</html>`;
}

<<<<<<< HEAD
function getImage(src: string, width = "auto", height = "225") {
  return `<img
        class="logo"
=======
function getImage(src: string, width = "auto", height = "125") {
  return `<img
>>>>>>> ea371eb9bc7c0e272c5df5f14113b8e63f028f70
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
