# Family Solutions

Static website for Family Solutions, a West Bloomfield practice that treats family conflict and estrangement. The public name is Family Solutions. Sherry Wexler and Marcie Israel are licensed therapists in Michigan. The site explains two care paths — repair and reunite, and safe distance and coping — and gives visitors a way to start a conversation. The published host remains `estrangedfamilysolutions.com` until a new domain is chosen.

## Where it is published

GitHub Pages publishes the root of `main`. There is no build step and no GitHub Actions workflow. `.nojekyll` is in the repository root so Pages serves the HTML as written, instead of running Jekyll.

In the repository settings, **Pages → Build and deployment → Source** should stay **Deploy from a branch**, branch `main`, folder `/ (root)`.

The custom domain is the apex, set by the `CNAME` file at the repository root:

```
estrangedfamilysolutions.com
```

That file must contain only that hostname. Do not put `www` in `CNAME`. GitHub uses the apex as the primary domain and redirects `www.estrangedfamilysolutions.com` to it once the `www` DNS record below is in place. The certificate GitHub issues covers both names.

- https://estrangedfamilysolutions.com/
- https://www.estrangedfamilysolutions.com/ redirects to the apex
- https://joshuaofisrael.github.io/estranged-family-solutions/ redirects to the apex

Merging to `main` publishes the site.

### Namecheap DNS

The domain `estrangedfamilysolutions.com` is registered at Namecheap (Joshua Israel Ventures). Point it at GitHub Pages from **Domain List → Manage → Advanced DNS**. Remove any parking page, URL redirect, or extra A / AAAA / CNAME records for `@` and `www` before adding these.

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `joshuaofisrael.github.io` |

Use Automatic TTL. The `www` target is the GitHub user site, not the repository name. If Advanced DNS already matches this table, leave those records in place.

After the records propagate, open **Settings → Pages** and confirm the custom domain is `estrangedfamilysolutions.com`. Then turn on **Enforce HTTPS**. Leave that off until GitHub shows the DNS check as successful. Until it is on, `http://` still serves the site without redirecting to `https://`.

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

The about page lists only what the practice has confirmed.

**Sherry Ilyse Wexler, LMSW** — Michigan clinical social worker (license 6801058964; NPI 1104562966). In clinical practice since 1988. Clinical social work path includes Wayne State University School of Medicine. Formerly Sherry Sack. Co-founder with Marcie Israel. Practice photograph: `assets/sherry-wexler.jpg`. Based in Farmington Hills; telehealth Monday–Friday 8 a.m.–7 p.m., occasional weekends; office line (248) 609-1379. Psychology Today profile may be linked, but do not paste its wording. Do not invent a degree title from Wayne State or a year count beyond 1988.

**Marcie Israel** (also Marcie Weinbaum Israel), **MSW, CSW** — Michigan licensed clinical social worker (license 6801059729; NPI 1780623736). Decades of clinical social work; do not invent a year count. Associated with clinical social work in Metro Detroit, including Livonia and Farmington Hills. Co-founder with Sherry Wexler. Do not add employers, extra degrees, or specialties she has not claimed.

Both focus on family estrangement: repair when it can be safe, and safe distance and coping when it cannot. Do not add testimonials.

### Contact form

Submissions are sent with [FormSubmit](https://formsubmit.co/) to **joshuaofisrael@gmail.com**. The endpoint is set in `js/config.js`. The form asks for name, email, phone (optional), which path the person is exploring, and a message. A hidden honeypot field is included for spam. The contact page tells people to call 911 or 988 instead of using the form in a crisis.

**One-time activation.** FormSubmit will not deliver messages until the inbox confirms the form. The first submission sends a confirmation email to joshuaofisrael@gmail.com from FormSubmit. Open that email and click the activation link. After that, new submissions arrive in the inbox. Until the link is clicked, the form tells the visitor to email the practice directly.

To use a different address later, change `practiceEmail` and `formsubmitEndpoint` in `js/config.js`, and the `action` on the form in `contact.html`. The endpoint looks like `https://formsubmit.co/ajax/you@example.com`.

Do not ask people to put clinical detail in the form. It is not a patient portal.

### Crisis language

The footer, contact page, and path pages tell people to call 911 in immediate danger and 988 in the U.S. for the Suicide & Crisis Lifeline. Keep that language when you edit those pages. This site is practice information, not emergency care.

## Fonts

Fraunces and Source Sans 3 are self-hosted in `fonts/` under the SIL Open Font License. License texts are in that folder. The site does not request fonts from a third party.
