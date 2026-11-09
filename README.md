# Moodverse 🌈

One line, one mood, every day — shown as a living 3D month.

**Open / install the app:** <https://gaurav-yadav-2.github.io/moodverse/>

## What's in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app (HTML + CSS + JavaScript). |
| `manifest.webmanifest` | Tells phones the app's name, icon and to open full-screen. |
| `sw.js` | Service worker: caches the app so it opens instantly and works offline. |
| `icons/` | Home-screen icons. |

Keep these together — upload the whole folder.

## Where your data is saved

- Entries are saved **only on the device you use**, inside the browser's own storage
  (`localStorage`). There is no server, no account, nothing is uploaded — not even to the
  website that hosts the app.
- Each device / browser has its **own separate journal**. Your phone and laptop don't sync.
- Once installed, the app asks the phone to keep its storage permanently, so it isn't cleared
  when space runs low. Uninstalling the app or clearing the browser's site data **deletes the
  entries**.
- **Back up regularly:** ⚙️ Settings → *Back up (export)* saves a `.json` file (on a phone it
  opens the share sheet: save it to Files, Google Drive, or email it to yourself).
  *Restore (import)* loads it back — also the way to move your journal to a new phone.

## Install it on your phone

A phone can only install a web app from an **https** website, so first put this folder online
(free), then open the link on your phone.

### Step 1 — Put it online (GitHub Pages, free and permanent)

1. Create a free account at <https://github.com> and click **New repository**.
   Name it e.g. `moodverse`, make it **Public**, click **Create repository**.
2. Click **uploading an existing file**, drag in `index.html`, `manifest.webmanifest`, `sw.js`
   and the `icons` folder, then click **Commit changes**.
3. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, click **Save**.
4. After a minute your app is live at `https://YOUR-USERNAME.github.io/moodverse/`.

(Any static host works the same way — Netlify, Cloudflare Pages, Vercel, etc.)

### Step 2 — Install

- **Android (Chrome):** open the link → tap **Install app** in Moodverse's settings, or the
  browser menu ⋮ → **Install app** / **Add to Home screen**.
- **iPhone / iPad (Safari):** open the link → tap **Share** ⬆ → **Add to Home Screen** → **Add**.

Moodverse now has its own icon, opens full-screen and works offline.

## Updating the app later

Upload the new `index.html` (replace the old one), and in `sw.js` change
`const VERSION = 'moodverse-v1'` to `'moodverse-v2'` (and so on) and upload that too.
Installed phones pick up the new version the next time the app is opened with a connection.
Your entries are not affected by updates.

## Trying it on your computer

Double-clicking `index.html` works for a quick look, but browsers don't allow installing or
offline mode from a plain file. To test the installable version locally, run a tiny server in
this folder and open <http://localhost:8000>:

```bash
python -m http.server 8000
```
