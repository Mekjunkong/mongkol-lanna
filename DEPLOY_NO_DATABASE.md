# ✅ MONGKOL LANNA — Deploy WITHOUT Database (Works Now!)

**Simple path: Deploy to Vercel without Supabase. Add database later.**

---

## **Deploy Right Now (No Database Setup Needed)**

### **Step 1: Set Vercel Environment Variables (From Phone)**

Go to: https://vercel.com/dashboard/mongkol-lanna/settings/environment-variables

**Remove or clear: `DATABASE_URL`** (delete it if it's there)

**Make sure these are present:**
```
NODE_ENV = production
REAL_GENERATION = false
MOCK_CHECKOUT = true
```

That's it. Only 3 variables needed.

---

### **Step 2: Redeploy**

1. Go to: https://vercel.com/dashboard/mongkol-lanna/deployments
2. Find the failed build (red X)
3. Click **"Redeploy"**
4. Wait 2–3 minutes ✨

---

### **Step 3: Test the Live Site**

Once deployment shows **green ✓**:

1. Click the URL or visit: https://mongkol-lanna.vercel.app
2. You should see the homepage (no 404 error)
3. Click **"เริ่มสร้างงาน"** to test the wizard
4. Everything works with **mock data**

---

## **How It Works Without Database**

The app uses **in-memory mock storage**:
- All artwork commissions stored in memory (lost on page refresh)
- Perfect for testing and demos
- No database to set up right now

---

## **Add Supabase Later (When Ready)**

Once you're happy with the live site, you can add a real database:

1. Create Supabase project
2. Get connection string
3. Add `DATABASE_URL` to Vercel env vars
4. Redeploy
5. Data persists to real database

For now: **Just remove DATABASE_URL and redeploy.** 🎨

---

**Try it! Report back when you redeploy.** ✨
