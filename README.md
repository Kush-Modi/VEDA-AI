# Changed Files

## Frontend
- `frontend/app/(public)/page.tsx` (Moved)
- `frontend/app/(public)/login/page.tsx` (Moved)
- `frontend/app/(public)/signup/page.tsx` (Moved)
- `frontend/app/(dashboard)/layout.tsx` (New Dashboard Layout)
- `frontend/app/(dashboard)/dashboard/page.tsx` (Moved)
- `frontend/app/(dashboard)/assignments/page.tsx` (Moved)
- `frontend/app/(dashboard)/groups/page.tsx` (Moved)
- `frontend/app/(dashboard)/library/page.tsx` (Moved)
- `frontend/app/(dashboard)/toolkit/page.tsx` (Moved)
- `frontend/app/(dashboard)/profile/page.tsx` (Moved)
- `frontend/app/(dashboard)/settings/page.tsx` (Moved)
- `frontend/app/(dashboard)/paper-preview/page.tsx` (Moved & Updated to remove fallback paper)
- `frontend/app/(dashboard)/create-assignment/page.tsx` (Moved)
- `frontend/app/layout.tsx` (Updated, removed global sidebar/navbar)
- `frontend/components/layout/Sidebar.tsx` (Updated to use authenticated user instead of hardcoded school)
- `frontend/contexts/AuthContext.tsx` (Added `/auth/me` fetch)
- `frontend/components/create/AssignmentForm.tsx` (Removed fallback paper import)
- `frontend/data/generatedPaper.ts` (Deleted)

## Backend
- `backend/src/controllers/authController.ts` (Added `getMe`)
- `backend/src/routes/authRoutes.ts` (Added `/me` route)
- `backend/src/workers/assignmentWorker.ts` (Added explicit logs and error throwing)
