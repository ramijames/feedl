# Feedloom

Feedloom is a way to manage the bulk downloading of MP3s for Podcasts via RSS feeds. You can then copy these wherever you'd like so that you can listen to them offline.

## Running the app locally

To run this locally for development purposes, you'll need to run two commands. Run these in two separate terminals, from the working directory.

```sh
npm run dev # Run your Nuxt 3 server locally
npm run electron:dev # Build your electron app locally
```

## Building your electron app

To build your electron app and package it for release:

```sh
npm run build  # Build Nuxt
npm run electron:build  # Build the macOS app
```

The .dmg file will be in the dist_electron folder.