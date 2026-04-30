# KeyboardTrans Web App

Fix text typed on the wrong Thai-English keyboard layout instantly.

## Live Demo

Deployed on GitHub Pages at: `https://YOUR_USERNAME.github.io/keyboard-webapp/`

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deployment

This project uses GitHub Actions to automatically deploy to GitHub Pages when you push to the `main` branch.

### First-time setup:

1. Create a new GitHub repository
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/keyboard-webapp.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: GitHub Actions
   - Save

4. Push to trigger deployment:
```bash
git push
```

The GitHub Action will automatically build and deploy your site!

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
