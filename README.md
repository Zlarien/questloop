# QuestLoop (Focus Quest)

Le projet de mon petit cousin de 12 ans, construit avec Claude Code pendant une séance où je lui ai appris le vibe coding.

Il pensait que l'IA était réservée aux gens calés. Sa première idée était une startup générique. Je lui ai demandé pourquoi ce sujet, il n'a pas su répondre. Deux minutes plus tard il m'a parlé d'émulateurs, on est partis de là, et il est reparti avec ce jeu qui marche et qu'il sait expliquer. Il n'en revenait pas que ce soit si simple : il faut juste les bons outils et la bonne méthode.

## Le principe

- **Battle** : un minuteur de concentration. Une session terminée rapporte de l'or.
- **Shop** : on dépense son or.
- **Play** : 50 or débloquent une partie sur un émulateur NES intégré (jsnes).

## Lancer

```
npm install
npm run dev
```

Aucune ROM n'est fournie. Place un fichier `.nes` que tu as le droit d'utiliser dans `public/roms/` et adapte `romUrl` dans `src/App.jsx`.

Stack : React 18, Vite, Zustand, Tailwind, jsnes.
