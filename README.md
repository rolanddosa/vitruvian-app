# vitruvian-app
Mobile app &amp; web app

### Deployment
The files in docs are rendered in Github Pages
They can be updated either via push or PR to main branch
After the file changes, check changes at https://rolanddosa.github.io/vitruvian-app/
Settings: https://github.com/rolanddosa/vitruvian-app/settings/pages

### Architecture decisions
React Native + Expo for components reusability between mobile apps and web app

### Expo
```npx expo start```
```npm run export:docs``` (or ```npx expo export --platform web --output-dir ../docs && git add ../docs```) under ```repos/vitruvian-app/expo-app```
```npx create-expo-app```

### To study:
The presence of .nojekyll file in the docs folder - Influences how Github Pages displays the page.