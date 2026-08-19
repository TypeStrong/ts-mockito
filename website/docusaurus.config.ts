import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ts-mockito',
  tagline: 'Mocking library for TypeScript inspired by Mockito',
  favicon: 'img/mockito_masks.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://typestrong.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ts-mockito/',

  // GitHub pages deployment config.
  organizationName: 'TypeStrong',
  projectName: 'ts-mockito',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/TypeStrong/ts-mockito/tree/master/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/ts-mockito.ts'],
        tsconfig: '../tsconfig.typedoc.json',
        readme: 'none',
        name: 'API Reference',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ts-mockito',
      logo: {
        alt: 'ts-mockito logo',
        src: 'img/mockito_masks.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://github.com/TypeStrong/ts-mockito',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/intro'},
            {label: 'API Reference', to: '/api'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/TypeStrong/ts-mockito'},
            {label: 'npm', href: 'https://www.npmjs.com/package/@typestrong/ts-mockito'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ts-mockito contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
