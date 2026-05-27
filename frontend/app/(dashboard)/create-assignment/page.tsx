import { AssignmentForm } from '@/components/create/AssignmentForm';

export default function CreateAssignmentPage() {
  return (
    <div className="animate-in fade-in zoom-in duration-500 py-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <AssignmentForm />
      </div>
    </div>
  );
}
