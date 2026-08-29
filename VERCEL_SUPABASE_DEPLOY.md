# ✅ MONGKOL LANNA — Vercel Deployment Instructions (Supabase)

**Code Status:** ✅ Pushed to GitHub  
**Repo:** https://github.com/Mekjunkong/mongkol-lanna  
**Database:** Supabase (free tier)

---

## **Step 1: Create Supabase Project** (5 min)

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name:** `mongkol-lanna`
   - **Database Password:** Generate strong password (save it!)
   - **Region:** Choose closest to Thailand (Singapore recommended)
4. Click **"Create new project"** and wait for it to spin up
5. Go to **Settings → Database → Connection String** (URI tab)
6. **Copy the full connection string** (looks like: `postgresql://postgres:PASSWORD@host:5432/postgres?sslmode=require`)

---

## **Step 2: Deploy to Vercel**

1. Go to https://vercel.com/new
2. Click **"Continue with GitHub"** (you're already logged in as Mekjunkong)
3. Search for **`mongkol-lanna`** and click **"Import"**
4. When you see **"Configure Project"**:
   - Skip **"Connect Git repository"** (already connected)
   - Under **"Environment Variables"**, add:
     ```
     DATABASE_URL = <paste-supabase-connection-string-here>
     NODE_ENV = production
     REAL_GENERATION = false
     MOCK_CHECKOUT = true
     ```
5. Click **"Deploy"**
6. Wait 2–3 minutes for build to complete ✨

---

## **Step 3: Verify Deployment**

Once Vercel shows **"Congratulations! Your project is live"**:

1. Click the live URL or go to: **`https://mongkol-lanna.vercel.app`**
2. Test the homepage and `/create` wizard
3. Create a mock artwork and see the preview

---

## **If Build Fails**

Go to **Vercel → Deployments → View logs** and send me the error. Most common:
- Missing `DATABASE_URL` format
- Supabase connection string has special characters (URL-encode them if needed)
- Node version mismatch (should auto-resolve)

---

## **Step 4: (Later) Enable Real Generation**

When you're ready to generate real artwork:

1. Get your Kie API key (or alternative provider)
2. In **Vercel Settings → Environment Variables**, add:
   ```
   KIE_API_KEY = <your-key>
   ```
3. Change `REAL_GENERATION` from `false` to `true`
4. Vercel auto-redeploys with real generation enabled

---

## **Next Steps**

- [ ] Create Supabase project
- [ ] Copy database connection string
- [ ] Deploy to Vercel
- [ ] Test `/create` wizard
- [ ] Share live URL with first customers

**Link to repo:** https://github.com/Mekjunkong/mongkol-lanna  
**Live site:** https://mongkol-lanna.vercel.app (after deploy)

---

**Ready?** Create the Supabase project and I'll monitor the Vercel deployment. You should have a live site in ~10 minutes. 🎨

