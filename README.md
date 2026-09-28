# Estranged Family Solutions

Static website for Estranged Family Solutions, a family estrangement therapy practice in West Bloomfield, Michigan. Sherry Wexler and Marcie Israel are licensed therapists in Michigan. The site explains two care paths — repair and reunite, and safe distance and coping — and gives visitors a way to start a conversation.

The live site is published with GitHub Pages at:

https://joshuaofisrael.github.io/estranged-family-solutions/

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000 --directory site
```

Open http://localhost:8000/

Links are relative, so the same files also work when GitHub Pages serves them from `/estranged-family-solutions/`.

## Edit the site

All public pages live in `site/`. There is no build step. Change the copy in the HTML file for that page, then commit.

| Page | File |
| --- | --- |
| Home | `site/index.html` |
| Repair & reunite | `site/repair.html` |
| Safe distance & coping | `site/distance.html` |
| About | `site/about.html` |
| Contact | `site/contact.html` |
| Privacy note | `site/privacy.html` |

Shared styles are in `site/css/styles.css`. Navigation behavior and the contact form are in `site/js/main.js`.

Keep each page’s `<title>` and meta description unique. Mention West Bloomfield and family estrangement where it belongs in the sentence, not as a list of keywords.

### Bios and credentials

The about page states only what is confirmed: both therapists are licensed in Michigan, and the practice in West Bloomfield focuses on family estrangement. Do not add degrees, license numbers, years in practice, or extra specialties until the practice provides them. When you have those details, put them in `site/about.html` and remove the note that says they are not listed yet.

### Contact form

Open `site/js/config.js` and set one of these:

1. `practiceEmail` — the real practice inbox. Submitting the form opens the visitor’s email app with the message filled in, and shows a copy they can send if the app does not open.
2. `formspreeEndpoint` — a Formspree form URL, exactly `https://formspree.io/f/your-id`. The form then sends the message to Formspree. Create the form at [formspree.io](https://formspree.io/) and paste the endpoint only. The script rejects any other URL.

Leave the unused value as `""`. If both are empty, the form still prepares the message on the page and tells the visitor the inbox is not connected. That is intentional, so the site never invents an email address.

Do not ask people to put clinical detail in the form. It is not a patient portal.

### Crisis language

The footer, contact page, and path pages tell people to call 911 in immediate danger and 988 in the U.S. for the Suicide & Crisis Lifeline. Keep that language when you edit those pages. This site is practice information, not emergency care.

## GitHub Pages

`.github/workflows/pages.yml` publishes the `site/` directory. It runs on every push to `main`, and it can be started manually with “Run workflow”.

The repository’s Pages source must be **GitHub Actions** (Settings → Pages → Build and deployment → Source). After a successful run, the site is available at the URL above.

`README.md` and the workflow file stay outside `site/`, so they are not part of the public website.

## Fonts

Fraunces and Source Sans 3 are self-hosted in `site/fonts/` under the SIL Open Font License. License texts are in that folder. The site does not request fonts from a third party.
