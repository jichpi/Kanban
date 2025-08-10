# Kanban Pro (Supabase) – Déploiement GitHub Pages (HTTPS)

## Étapes rapides
1. **Créer un repo GitHub** (public ou privé avec Pages).
2. Ajouter les fichiers de ce dossier : `index.html`, `README.md`, `CNAME` (optionnel), etc.
3. Aller dans **Settings → Pages** :
   - *Source*: **Deploy from a branch**
   - *Branch*: `main` (ou `master`) / dossier **/** (root)
4. Attendre le build : votre site sera servi en **HTTPS** sous `https://<utilisateur>.github.io/<repo>/`.

## Supabase
1. Crée un projet Supabase.
2. Dans **Settings → API**, copie `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
3. Dans **SQL**, exécute le bloc SQL à la fin de `index.html` (tables, RLS, realtime).
4. Ouvre le site déployé → descends en bas de page → colle `SUPABASE_URL` + `SUPABASE_ANON_KEY`.

> ⚠️ Ne jamais exposer la **service_role key** côté client.

## En-têtes de sécurité (CSP, HSTS...)
GitHub Pages ne permet pas d’ajouter facilement des en-têtes HTTP personnalisés. Pour une CSP stricte, utiliser plutôt Netlify/Vercel.  
Malgré tout, les requêtes vers Supabase sont en **HTTPS** et les clés `anon` sont protégées par vos **RLS**.

## Domain perso (optionnel)
- Ajouter un fichier **CNAME** à la racine contenant uniquement votre domaine (ex: `kanban.example.com`).
- Ajouter un CNAME dans votre DNS vers `username.github.io`.
