# hyperapp-tutorial

A Hyperapp (https://github.com/jorgebucaran/hyperapp) tutorial application. It uses a Django - DRF API to provide a (writable) REST API.

**Work in progress! I'll try to add more capabilities to this app; or you can do it if you want; PRs are welcome!!!**

## Demo

![Hyperapp-tutorial demo](demo.gif?raw=true "Hyperapp-tutorial demo")

## Components used

1. Hyperapp (obviously)
1. Spectre.css for styling (https://picturepan2.github.io/spectre/)
1. A bunch of home-made spectre.css components for hyperapp (https://github.com/spapas/hyperapp-tutorial/tree/master/srcjs/components)
1. Browserify / watchify and uglify for JS bundling
1. Django/DRF for server-side stuff

## To run it locally

1. Create a python virtualenv and activate it (`virtualenv venv`)
1. Install python requirements (`pip install -r requirements.txt`) 
1. Create a superuser (`python manage.py cratesuperuser`)
1. Run server (`python manage.py runserver`)

## To develop in JS:

1. Install requirements (`yarn install`)
1. Run watch (`yarn run watch`)

## To create prod build:

1. Run build (`yarn run build`)
