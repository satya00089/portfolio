# Project order and artwork

The selected-work section is driven by `PORTFOLIO_INFO` in
`src/config/portfolioData.ts`. Put your strongest project first in the
`projects` array, then set how many projects should appear before the
“More projects” disclosure:

```ts
projectDisplay: {
  featuredCount: 5, // Use 3, 5, 7, or another number that suits your work.
  heading: "Work shaped around a useful question.",
  intro: "A few products where I turned complex ideas into useful tools.",
},
```

The first `featuredCount` projects are shown in the main section. Remaining
projects stay available under “More projects”. The order in the array controls
their sequence, so move a project to the top when it becomes your strongest
example. Three to five featured projects usually make a focused portfolio;
seven works when each project adds a distinct kind of evidence.

## Use real product visuals

Use a real screenshot, recording, or animated preview for the `image` field.
This is the proof of what the product actually looks like. Use the project's
real logo in `logo`; the template will not invent one. When `artwork` is set,
it appears as the illustrated cover of the project card. The `image` remains
the product preview in the project details. Without artwork, the card uses
the preview image. Artwork can be made with an image model.

For local files, add images under `public/projects/` and use the Vite base URL:

```ts
{
  id: "my-project",
  title: "My project",
  short: "One clear sentence about what the project helps people do.",
  image: `${import.meta.env.BASE_URL}projects/my-project-preview.webp`,
  imageAlt: "The project workspace showing its main workflow",
  logo: `${import.meta.env.BASE_URL}projects/my-project-logo.svg`,
  artwork: `${import.meta.env.BASE_URL}projects/my-project-artwork.webp`,
}
```

`logo` and `artwork` are optional. A project can use an image hosted elsewhere
instead, provided its URL points directly to a publicly accessible image file.
Check that the URL opens as an image in a private browser window. A sharing
page from Drive or a private image library is not a direct image URL.

## Prompt for complementary artwork

Use this prompt in ChatGPT, Claude, or another image tool. Replace the bracketed
details with the project's purpose. Attach a real screenshot only if you want
the model to help compose a background around it; keep the screenshot and logo
unchanged in the finished portfolio.

```text
Create a wide Wabi-Sabi watercolor illustration for a software
portfolio project about [WHAT THE PROJECT HELPS PEOPLE DO]. Use [A SIMPLE
NATURAL OR MATERIAL METAPHOR, SUCH AS LAYERED PAPER, A BRUSHED INK PATH, OR
SOFTLY STACKED FORMS]. Keep the composition thoughtful and a little playful,
with asymmetry and one imperfect hand-drawn accent. Use this restrained palette:
warm paper #f3efe6, soft paper #faf8f1, ink #33352e, moss #58684a, terracotta
#a7765a, and muted ochre #c2a36a. Let the metaphor hint at the project's idea
without depicting a product interface. Use a transparent background and let
the illustrated shapes occupy the center. No words, letters, logos,
brand marks, interface mockups, code, charts, fake data, or watermarks. Avoid
heavy distress, busy patterns, strong gradients, and overly cute illustration.
Create a polished landscape image suitable for a project card cover.
```

Ideas for the metaphor can reflect the project's subject: connected ink strokes
for a collaboration tool, layered forms for cloud infrastructure, or a rhythm
of small tiles for a learning product. Keep it suggestive rather than literal.

## Prepare and add the files

1. Export the real preview as WebP or PNG, ideally around 1600 × 1000 pixels.
   Crop out browser tabs and unrelated desktop content.
2. Export the optional artwork as a landscape image, ideally with a transparent
   background. Keep the file reasonably small for mobile.
3. Upload the images to `public/projects/` or a public image host that gives you
   direct file URLs.
4. Paste the URLs into `image`, `logo`, and `artwork` for the matching project.
   Add an `imageAlt` description for the real preview.
5. Move projects into the desired order and set `projectDisplay.featuredCount`.

Avoid putting confidential customer information, access tokens, private data,
or unreleased work into screenshots or image prompts.
