# Ayhem Belkhamsa - Portfolio

Portfolio site for my industrial automation and machine-building work in northern Tunisia (Bizerte, Menzel Bourguiba and surrounding industrial hubs).

Static site: plain HTML, CSS and a little JavaScript. No build step, no dependencies.

## Structure

```
index.html          page content
css/style.css       all styles
js/main.js          HMI readout animation + quote form (opens a prefilled email)
assets/images/      project and workshop photos (resized, metadata stripped)
assets/favicon.svg
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository go to **Settings -> Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. The site goes live at `https://<your-username>.github.io/<repo-name>/` after a minute or two.

For a URL without the repo name, name the repository `<your-username>.github.io`.

## Editing

- Contact email: search `belkhamsaayhem09@gmail.com` in `index.html` and `js/main.js`.
- New project: copy a `ticket` block in the Project Log section of `index.html`.
- New photo: put a resized JPEG in `assets/images/` and add a `<figure>` to the `photo-grid`.

## License

All content and photos (c) Ayhem Belkhamsa. All rights reserved.
