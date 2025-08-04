# CLAUDE.md – Transition Instructions for Existing Project

This project was started in an older Claude web session and may contain redundant or outdated code. Now we are finishing it using Claude Desktop + VS Code plugins.

## ✅ Goals
1. **Review & Sync Context:** 
   - Read all current files and reconcile any inconsistencies from earlier iterations.

2. **Clean Up & Optimize:**
   - Identify and remove redundant, conflicting, or unused code.
   - Consolidate styles, functions, and components for clarity.

3. **Baseline Summary:**
   - Provide a clear, concise summary of the current project state (key files, recent changes, known issues) before major edits.

4. **Resume Best Practices:**
   - After cleanup, switch to the structured workflow from now on:
     - Plan first, work incrementally, label file changes clearly.
     - Edit only what’s necessary using VS Code diff previews.

*(Do not rewrite working code unnecessarily. Focus on cleanup first, then proceed step by step.)*

## ⚡ Project Continuity
**ALWAYS read HANDOFF.md first when starting work on this project** - it contains current project state, recent changes, and development guidelines including the auto-compact at 11% rule.

### Quick Context (Last Updated: 2025-08-04)
- Portfolio site for Estonian film director Triin Ruumet
- MIGRATION IN PROGRESS: Transitioning from https://triin-portfolio-simple.vercel.app to www.triinruumet.com
- DNS propagation status: Nameservers changed to Vercel, waiting for A records to resolve (15-30 min)
- Recent work: GA4 integration (G-RZY7323H9M), domain migration from Squarespace
- Key features: Lightbox galleries, mobile-optimized hero video, bilingual EN/EE
- Mobile-first approach with elegant, minimal design
- All major functionality working and deployed

### Current Migration Status
- ✅ Google Analytics 4 tracking added to all pages
- ✅ Domain added to Vercel (triinruumet.com + www.triinruumet.com)  
- ✅ Nameservers updated in Squarespace Domains (ns1/ns2.vercel-dns.com)
- 🔄 DNS propagation in progress (showing `-` transition state)
- ⏱️ Next: Monitor dnschecker.org for Vercel IPs to appear
