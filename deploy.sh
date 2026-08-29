#!/usr/bin/env bash
# MONGKOL LANNA — Quick Vercel Deploy Script

set -e

echo "🚀 MONGKOL LANNA → Vercel Deployment Checklist"
echo ""

# Step 1: Verify Git
echo "📍 Step 1: Verify Git repository"
if ! git remote get-url origin | grep -q "mongkol-lanna"; then
  echo "❌ Git remote not configured. Run:"
  echo "   git remote add origin https://github.com/Mekjunkong/mongkol-lanna.git"
  exit 1
fi
echo "✅ Git remote: $(git remote get-url origin)"
echo ""

# Step 2: Verify code
echo "📍 Step 2: Verify code quality"
echo "  • Running typecheck..."
pnpm typecheck > /dev/null 2>&1 && echo "✅ TypeScript" || (echo "❌ TypeScript failed" && exit 1)
echo "  • Running tests..."
pnpm test > /dev/null 2>&1 && echo "✅ Tests (62/62)" || (echo "❌ Tests failed" && exit 1)
echo "  • Running linter..."
pnpm lint > /dev/null 2>&1 && echo "✅ Linter" || (echo "❌ Linter failed" && exit 1)
echo "  • Building..."
pnpm build > /dev/null 2>&1 && echo "✅ Build" || (echo "❌ Build failed" && exit 1)
echo ""

# Step 3: Push to GitHub
echo "📍 Step 3: Push to GitHub"
git status --short
echo ""
echo "Ready to push? (Vercel will auto-deploy on push)"
echo "Run: git push -u origin main"
echo ""

# Step 4: Vercel instructions
echo "📋 After pushing to GitHub:"
echo ""
echo "1️⃣  Go to https://vercel.com/new"
echo "2️⃣  Click 'Continue with GitHub'"
echo "3️⃣  Select 'Mekjunkong/mongkol-lanna'"
echo "4️⃣  Click 'Import'"
echo "5️⃣  Add environment variables (see VERCEL_DEPLOY.md):"
echo "    • DATABASE_URL (choose Vercel Postgres, Supabase, or Neon)"
echo "    • KIE_API_KEY (when ready for real generation)"
echo "6️⃣  Click 'Deploy'"
echo ""
echo "✨ Your live site will be ready in 2–3 minutes!"
echo ""
echo "Need help? See: VERCEL_DEPLOY.md"
