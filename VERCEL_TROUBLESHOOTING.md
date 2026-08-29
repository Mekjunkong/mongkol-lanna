# 🔧 MONGKOL LANNA — Vercel Deployment Troubleshooting

**If deployment is failing, here are the most common causes & fixes:**

---

## **Issue 1: Build Timeout or Out of Memory**

**Error:** `Build process exited with exit code 1`

**Fix:**
1. Go to Vercel dashboard → Project Settings → Build & Development Settings
2. Scroll to "Build Command"
3. Change to: `pnpm install && pnpm build --no-fork`
4. Click "Save"
5. Redeploy (click "Deployments" → find failed build → click "Redeploy")

---

## **Issue 2: Missing DATABASE_URL**

**Error:** `Error: DATABASE_URL is required in environment`

**Fix:**
1. In Vercel dashboard, go to Settings → Environment Variables
2. Add: 
   ```
   DATABASE_URL = postgresql://postgres:YOUR_PASSWORD@host:5432/postgres?sslmode=require
   ```
3. Copy the EXACT connection string from Supabase (Settings → Database → Connection String URI)
4. Make sure NO spaces at the beginning or end
5. Redeploy

---

## **Issue 3: Node Version Incompatibility**

**Error:** `Node version 18.x is required but...`

**Fix:**
1. Create a file `.nvmrc` in the repo root with: `20`
2. Or in Vercel Settings → Node.js Version → Select 20
3. Redeploy

---

## **Issue 4: Dependency Conflict**

**Error:** `pnpm install failed` or `npm ERR!`

**Fix:**
1. Delete `pnpm-lock.yaml` locally
2. Run: `pnpm install`
3. Run: `pnpm build`
4. Commit & push: `git add pnpm-lock.yaml && git commit -m "update lock" && git push`
5. Vercel auto-redeploys

---

## **Issue 5: Environment Variable Format**

**Error:** `Invalid DATABASE_URL format`

**Fix:**
If your Supabase connection string has special characters (like `@` or `#`):
1. URL-encode them:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `:` becomes `%3A`
2. Or just copy the exact string from Supabase—it's usually already formatted

---

## **Issue 6: Supabase Not Running**

**Error:** `Connection refused` or `database offline`

**Fix:**
1. Go to supabase.com/dashboard
2. Check if project status shows "Running"
3. If paused, click to resume
4. Wait 30 seconds
5. Redeploy Vercel

---

## **🆘 Get Me Full Logs**

If none of these work, send me:

1. **Vercel Logs:** In Vercel dashboard → Deployments → Click failed build → "View logs" → Copy everything

2. **Or send screenshot:** Show the red error message from Vercel

3. **Or send URL:** Paste the Vercel project URL (e.g., `https://vercel.com/dashboard/accounts/.../mongkol-lanna`)

---

## **⚡ Quick Redeploy Steps**

1. Vercel dashboard → **Deployments**
2. Find the failed deployment
3. Click **"Redeploy"**
4. Wait 2–3 minutes

---

**Which error are you seeing?** Share the message and I'll fix it immediately.
