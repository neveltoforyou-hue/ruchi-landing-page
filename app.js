/* =====================================================================
   You don't need to touch this file. It just reads links.txt and
   builds the buttons. If you want to add/remove links, open links.txt
   instead — this file only handles the "how it looks" part.
===================================================================== */

const TAGLINES = [
  "everything i love, in one place ✿",
  "come see what i'm into rn",
  "updated whenever i feel like it 🤍",
];

// known platforms: [match in hostname, emoji, display label]
const PLATFORM_MAP = [
  ["spotify", "🎧", "Spotify"],
  ["music.apple", "🎵", "Apple Music"],
  ["instagram", "📸", "Instagram"],
  ["youtube", "▶️", "YouTube"],
  ["youtu.be", "▶️", "YouTube"],
  ["pinterest", "📌", "Pinterest"],
  ["amazon", "🛍️", "Amazon"],
  ["myntra", "👗", "Myntra"],
  ["ajio", "👗", "Ajio"],
  ["nykaa", "💄", "Nykaa"],
  ["flipkart", "🛒", "Flipkart"],
  ["zara", "👜", "Zara"],
  ["hm.com", "👜", "H&M"],
  ["shein", "🛍️", "Shein"],
  ["etsy", "✨", "Etsy"],
  ["tiktok", "🎬", "TikTok"],
  ["snapchat", "👻", "Snapchat"],
  ["whatsapp", "💬", "WhatsApp"],
  ["wa.me", "💬", "WhatsApp"],
  ["twitter", "🐦", "Twitter / X"],
  ["x.com", "✕", "X"],
  ["linktr.ee", "🔗", "Linktree"],
  ["goodreads", "📚", "Goodreads"],
  ["notion", "🗒️", "Notion"],
  ["medium.com", "✍️", "Medium"],
  ["substack", "✍️", "Substack"],
];

function detectPlatform(hostname) {
  const clean = hostname.replace(/^www\./, "");
  for (const [match, emoji, label] of PLATFORM_MAP) {
    if (clean.includes(match)) return { emoji, label };
  }
  // fallback: turn "somecoolsite.com" into "Somecoolsite"
  const base = clean.split(".")[0];
  const label = base.charAt(0).toUpperCase() + base.slice(1);
  return { emoji: "🔗", label };
}

function parseLinksFile(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [rawUrl, customLabel] = line.split("|").map((s) => s && s.trim());
      let url = rawUrl;
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;

      let hostname = "";
      try {
        hostname = new URL(url).hostname;
      } catch (e) {
        return null; // skip malformed lines instead of breaking the page
      }

      const { emoji, label } = detectPlatform(hostname);
      return {
        url,
        emoji,
        title: customLabel || label,
      };
    })
    .filter(Boolean);
}

function renderLinks(links) {
  const list = document.getElementById("linkList");

  if (!links.length) {
    list.innerHTML = '<div class="empty-state">no links yet — add some in links.txt ✿</div>';
    return;
  }

  const frag = document.createDocumentFragment();

  links.forEach((link, i) => {
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.style.animationDelay = `${i * 70}ms`;

    const emoji = document.createElement("span");
    emoji.className = "link-emoji";
    emoji.textContent = link.emoji;
    emoji.setAttribute("aria-hidden", "true");

    const body = document.createElement("span");
    body.className = "link-body";

    const title = document.createElement("span");
    title.className = "link-title";
    title.textContent = link.title;
    body.appendChild(title);

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");

    a.appendChild(emoji);
    a.appendChild(body);
    a.appendChild(arrow);
    frag.appendChild(a);
  });

  list.appendChild(frag);
}

(function init() {
  const taglineEl = document.getElementById("tagline");
  taglineEl.textContent = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];

  fetch("links.txt")
    .then((res) => {
      if (!res.ok) throw new Error("couldn't load links.txt");
      return res.text();
    })
    .then((text) => renderLinks(parseLinksFile(text)))
    .catch(() => {
      document.getElementById("linkList").innerHTML =
        '<div class="empty-state">couldn\'t load links right now</div>';
    });
})();
