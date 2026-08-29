# MONGKOL LANNA — Vercel Deployment Guide

**Status:** Ready to deploy  
**Repository:** https://github.com/Mekjunkong/mongkol-lanna  
**Last Commit:** Main branch, all tests passing

---

## Step 1: Push to GitHub ✅

Code is ready. Push with:

```bash
cd /root/projects/mongkol-canvas
git push -u origin main
```

---

## Step 2: Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Select **"Continue with GitHub"**
3. Find and select **`Mekjunkong/mongkol-lanna`**
4. Click **"Import"**

---

## Step 3: Configure Environment Variables

In Vercel project settings, add these environment variables:

### Required for Development (already set to safe defaults)
```
NODE_ENV=production
REAL_GENERATION=false
MOCK_CHECKOUT=true
```

### Required for Production (when ready)
```
DATABASE_URL=postgresql://user:pass@host:5432/mongkol_lanna
KIE_API_KEY=<your-kie-api-key>
```

### Optional (for payment processing)
```
PAYMENT_PROVIDER=mock  # Change to: stripe, promptpay, etc.
PAYMENT_API_KEY=<your-key>
```

---

## Step 4: Configure Database

Choose one:

### Option A: Vercel Postgres (Recommended)
- Go to Vercel dashboard → Storage → Create → Postgres
- Vercel auto-populates `DATABASE_URL` environment variable
- Cost: ~$15/month for starter

### Option B: Supabase (Free tier available)
1. Create project at https://supabase.com
2. Get connection string from "Database" → "Connection strings" → "URI"
3. Add to Vercel as `DATABASE_URL`

### Option C: Neon (Free tier, best for hobby)
1. Create project at https://console.neon.tech
2. Copy connection string
3. Add to Vercel as `DATABASE_URL`

---

## Step 5: Deploy

In Vercel dashboard:
1. Click **"Deploy"** button
2. Wait ~2–3 minutes for build to complete
3. Get live URL (e.g., `https://mongkol-lanna.vercel.app`)

---

## Step 6: Verify Deployment

Once live:

```bash
# Test the home page
curl https://<your-domain>.vercel.app

# Test the wizard (mock generation)
# Visit: https://<your-domain>.vercel.app/create
```

---

## Step 7: Set Custom Domain (Optional)

In Vercel project settings → Domains:
1. Add custom domain (e.g., `mongkol-lanna.com`)
2. Update DNS records to point to Vercel
3. Vercel auto-issues SSL certificate

---

## Step 8: Enable Real Generation (When Ready)

Once you've verified everything works:

1. Get Kie API key (or alternative provider)
2. In Vercel project settings, change:
   ```
   REAL_GENERATION=true
   KIE_API_KEY=<your-key>
   ```
3. Vercel auto-redeploys with new env vars
4. Test generation on `/create` wizard

---

## Monitoring & Logs

**View deployment logs:**
- Vercel dashboard → Deployments → Click deployment → View logs

**Monitor errors in production:**
- Add Sentry integration (optional but recommended)
- Vercel Settings → Integrations → Add Sentry

**Check performance:**
- Vercel Analytics built-in (automatic)
- View at: Vercel dashboard → Analytics

---

## Rollback If Needed

If something breaks:
1. Go to Vercel Deployments tab
2. Find previous working deployment
3. Click **"Redeploy"**

---

## Cost Estimate

| Item | Cost |
|------|------|
| Vercel (Next.js hosting) | Free–$20/mo* |
| Vercel Postgres (optional) | $15/mo |
| Custom domain | $10–15/yr |
| Kie API (image generation) | Pay per image |
| **Total** | **$15–50/mo** |

*Free tier covers ~100,000 requests/month. Scales as needed.

---

## Next Actions for Mike

- [ ] Create GitHub account / verify Mekjunkong has push access
- [ ] Link GitHub to Vercel account
- [ ] Choose database provider (Vercel Postgres / Supabase / Neon)
- [ ] Get Kie API key (or confirm alternative)
- [ ] Deploy to Vercel
- [ ] Test /create wizard with mock generation
- [ ] Approve production (REAL_GENERATION=true)
- [ ] Set custom domain
- [ ] Configure payment processing
- [ ] Launch to customers

---

**Ready?** Push to GitHub and I'll guide you through Vercel setup in real-time.
