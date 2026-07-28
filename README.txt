RUCHI'S LINK PAGE — HOW IT WORKS
=================================

There's ONE file she ever needs to open: links.txt

To add a link: paste it on its own line. Save. Done.
To remove a link: delete its line.
To reorder: cut a line, paste it somewhere else.

That's genuinely it — no brackets, no quotes, no commas. The page
automatically recognizes Spotify, Instagram, Amazon, Pinterest, Myntra,
YouTube, and 20+ other common sites and gives each one the right icon
and label on its own. Anything it doesn't recognize still shows up
fine with a generic link icon.

If she ever wants a custom label instead of the automatic one, she can
add " | " after the link followed by her own text:
    https://open.spotify.com/playlist/xyz | My Vibe Playlist


PUTTING IT ONLINE WITH NETLIFY (first time)
--------------------------------------------
1. Go to https://app.netlify.com and sign up / log in (free).
2. On the dashboard, look for "Add new site" -> "Deploy manually"
   (shown as a big dashed drop-zone).
3. Drag the whole "ruchi-links" folder into that drop-zone.
4. Netlify gives a live link in a few seconds, like
   https://random-name-123.netlify.app
5. (Optional) Site settings -> Change site name, to something nicer
   like https://ruchi-links.netlify.app
6. Put that link in her Instagram bio.


UPDATING LINKS LATER
--------------------------------------------
1. Open links.txt, edit it, save.
2. Go back to the Netlify site -> "Deploys" tab.
3. Drag the whole folder in again — redeploys in seconds, and the
   live link stays exactly the same, so the Instagram bio never
   needs to change.


ONE TECHNICAL NOTE
--------------------------------------------
The page reads links.txt live, which needs a real web server — so it
won't show any links if someone just double-clicks index.html on their
own computer. It works perfectly once deployed on Netlify (or any
proper web host). If you want to preview it locally first, run this
from inside the folder:
    python3 -m http.server 8000
then open http://localhost:8000 in a browser.
