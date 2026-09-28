# Estranged Family Solutions

Static website for Estranged Family Solutions, a family estrangement therapy practice in West Bloomfield, Michigan. Sherry Wexler and Marcie Israel are licensed therapists in Michigan. The site explains two care paths — repair and reunite, and safe distance and coping — and gives visitors a way to start a conversation.

## Where it is published

GitHub Pages for this repository is already set to publish the root of `main`. A `CNAME` file keeps the custom domain:

- https://estrangedfamilysolutions.com/
- https://joshuaofisrael.github.io/estranged-family-solutions/ redirects to that domain

There is no build step. `.nojekyll` is in the repository root so GitHub Pages serves the HTML as written, instead of running Jekyll.

Merging to `main` publishes the site. In the repository settings, **Pages → Build and deployment → Source** should stay **Deploy from a branch**, branch `main`, folder `/ (root)`.

HTTPS is available for the custom domain. If visitors still land on `http://`, turn on **Enforce HTTPS** under Pages settings.

## Preview locally

From the repository root:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/

Links are relative, so the same files work on the custom domain and, if the custom domain is ever removed, on the GitHub project URL.

## Edit the site

Change the copy in the HTML file for that page, then commit.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Repair & reunite | `repair.html` |
| Safe distance & coping | `distance.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Privacy note | `privacy.html` |

Shared styles are in `css/styles.css`. Navigation and the contact form are in `js/main.js`.

Keep each page’s `<title>` and meta description unique. Mention West Bloomfield and family estrangement where it belongs in the sentence, not as a list of keywords.

### Bios and credentials

The about page states only what is confirmed: both therapists are licensed in Michigan, and the practice in West Bloomfield focuses on family estrangement. Do not add degrees, license numbers, years in practice, or extra specialties until the practice provides them. When you have those details, put them in `about.html` and remove the note that says they are not listed yet.

### Contact form

Submissions are sent with [FormSubmit](https://formsubmit.co/) to **joshuaofisrael@gmail.com**. The endpoint is set in `js/config.js`. The form asks for name, email, phone (optional), which path the person is exploring, and a message. A hidden honeypot field is included for spam. The contact page tells people to call 911 or 988 instead of using the form in a crisis.

**One-time activation.** FormSubmit will not deliver messages until the inbox confirms the form. The first submission sends a confirmation email to joshuaofisrael@gmail.com from FormSubmit. Open that email and click the activation link. After that, new submissions arrive in the inbox. Until the link is clicked, the form tells the visitor to email the practice directly.

To use a different address later, change `practiceEmail` and `formsubmitEndpoint` in `js/config.js`, and the `action` on the form in `contact.html`. The endpoint looks like `https://formsubmit.co/ajax/you@example.com`.

Do not ask people to put clinical detail in the form. It is not a patient portal.

### Crisis language

The footer, contact page, and path pages tell people to call 911 in immediate danger and 988 in the U.S. for the Suicide & Crisis Lifeline. Keep that language when you edit those pages. This site is practice information, not emergency care.

## Fonts

Fraunces and Source Sans 3 are self-hosted in `fonts/` under the SIL Open Font License. License texts are in that folder. The site does not request fonts from a third party.
