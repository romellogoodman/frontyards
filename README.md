# Frontyards

A single page that shows one random image from the Are.na channel
[romello-goodman/frontyards](https://www.are.na/romello-goodman/frontyards)
in the bottom-right corner. Reload for a different one.

Plain HTML / CSS / JS — no build step, no dependencies. It calls the public
Are.na API (`https://api.are.na/v2/channels/frontyards/contents`) directly
from the browser.

## Run it

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Layout

```
index.html      markup
css/style.css   positioning + fade-in
js/main.js      fetch channel → pick a random image block → set <img src>
```
