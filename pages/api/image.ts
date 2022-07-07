import { NextApiRequest, NextApiResponse } from 'next';
import nodeHtmlToImage from 'node-html-to-image';
import { getPuppeteerOptions } from '../../src/utils/puppeteer';

const defaultValues = {
    logoUrl: 'http://iammatthias.com/images/safari-pinned-tab.svg',
    titleFontName: 'Space Mono',
    titleFontSize: '48px',
    titleColor: '#000000',
    title: 'Sample title for the OG Image',
    titleCase: 'uppercase',
    background: `radial-gradient(circle at 50% 50%, rgba(249, 254, 255, 1), rgba(253, 255, 252, .2)), url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    titleBackground: 'transparent',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {
        title,
        titleFontName,
        titleFontSize,
        logoUrl,
        logoWidth,
        logoHeight,
        background,
        titleColor,
        titleCase = defaultValues.titleCase,
        titleBackground,
    } = req.query;

    const image = await nodeHtmlToImage({
        puppeteerArgs: await getPuppeteerOptions(),
        html: `<html> <head>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=${
              titleFontName || defaultValues.titleFontName
          }:wght@400;700");
          
          body {
            font-family: ${titleFontName || defaultValues.titleFontName};
            width: 1200px;
            height: 627px;
          }

          .root-container {
            width: calc(100% - 128px);
            height: calc(100% - 128px);
            padding: 64px;
            display: flex;
            flex-direction: column;
            align-items: space-between;
            justify-content: space-between;
            text-align: left;
            background: ${background || defaultValues.background};
          }

          .logo {
              ${logoWidth ? `width: ${logoWidth};` : 'width: 128px;'}
              ${logoHeight ? `height: ${logoHeight};` : 'height: 128pxl;'}
          }

          .title {
            font-size: ${titleFontSize || defaultValues.titleFontSize};
            color: ${titleColor || defaultValues.titleColor};
            line-height: 1;
            text-transform: ${titleCase};
            ${titleCase === 'uppercase' ? `font-weight: 700;` : ''}
            ${titleCase === 'uppercase' ? `letter-spacing: -0.005em;` : ''}
            background: ${titleBackground || defaultValues.titleBackground}
          }

          .subtitle {
            font-size: 24px;
            color: ${titleColor || defaultValues.titleColor};
          }

          hr {
            margin-top: 32px;
          }
        </style>
      </head>
      <body>
        <div class="root-container">
          <img src="${logoUrl || defaultValues.logoUrl}" class="logo" />
          <div>
            <span class="title">${title || defaultValues.title}</span>
            <hr/>
            <span class="subtitle">iammatthias.com</span>
          </div>
        </div>
      </body>
    </html>`,
    });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(image, 'binary');
}
