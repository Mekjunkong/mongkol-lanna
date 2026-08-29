# 🚀 MONGKOL LANNA → Deploy to Vercel in 5 Minutes

Everything is ready. Here's what to do:

---

## **Step 1: Create GitHub Repository**

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `mongkol-lanna`
   - **Description:** "Personal Thai–Lanna Art Atelier MVP"
   - **Public or Private:** Your choice
   - **Skip templates**
3. Click **"Create repository"**

---

## **Step 2: Push Code to GitHub**

Run this in terminal:

```bash
cd /root/projects/mongkol-canvas

# Push the code you just built
git push -u origin main

# Verify it worked
open https://github.com/Mekjunkong/mongkol-lanna
```

---

## **Step 3: Deploy to Vercel**

1. Go to https://vercel.com/new
2. Click **"Continue with GitHub"**
3. Search for and select **`mongkol-lanna`**
4. Click **"Import"**

---

## **Step 4: Configure Environment**

In Vercel's import dialog, before clicking Deploy:

**Environment Variables** → Add:

```
NODE_ENV = production
REAL_GENERATION = false
MOCK_CHECKOUT = true
```

(Database is optional for now — mock data works for testing. Add it later if needed.)

---

## **Step 5: Deploy**

Click **"Deploy"** and wait 2–3 minutes.

Your live site will be at: **`https://mongkol-lanna.vercel.app`**

---

## **Verify It Works**

Once deployed:

1. Visit **`https://mongkol-lanna.vercel.app`**
2. Click **"เริ่มสร้างงาน"** (Start Creating Artwork)
3. Walk through the wizard with mock data
4. See the preview with mock image generation

---

## **Next Steps (After Vercel Deploys)**

- [ ] Test the /create wizard on mobile
- [ ] Add Kie API key when ready for real generation
- [ ] Add database (Vercel Postgres / Supabase / Neon)
- [ ] Set custom domain (mongkol-lanna.com or similar)
- [ ] Enable payment processing
- [ ] Launch to first customers

---

## **Problems?**

- **GitHub push fails?** Make sure you have SSH key set up: `ssh -T git@github.com`
- **Vercel import fails?** Refresh browser, try again, or check that Mekjunkong account has GitHub linked
- **Deployment shows error?** Click "View logs" in Vercel dashboard to debug

---

**Ready?** Create the repo and push! I'll be here if you need help. 🎨
