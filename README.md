# KeyboardTrans Web App

Fix text typed on the wrong Thai-English keyboard layout instantly.

## Live Demo

Deployed on GitHub Pages at: `https://YOUR_USERNAME.github.io/keyboard-webapp/`

**Important:** Access the site with the trailing slash `/` at the end for proper functionality.

## Development

```bash
# Install dependencies
npm install

# Run dev server (access at http://localhost:3000)
npm run dev

# Build for production
npm run build
```

## Deployment

This project uses GitHub Actions to automatically deploy to GitHub Pages when you push to the `main` branch.

### First-time setup:

1. Create a new GitHub repository named `keyboard-webapp`
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
   - Under "Build and deployment", Source: Select **GitHub Actions**
   - Save

4. Your site will be deployed to: `https://YOUR_USERNAME.github.io/keyboard-webapp/`

### Updating the site:

After making changes, simply push to main:
```bash
git add .
git commit -m "Your commit message"
git push
```

The GitHub Action will automatically build and deploy!

## Troubleshooting

If CSS or JavaScript doesn't load:
1. Make sure you're accessing the URL with a trailing slash: `/keyboard-webapp/`
2. Check the browser console for errors
3. Verify that `basePath` in `next.config.ts` matches your repository name

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- GitHub Pages for hosting
