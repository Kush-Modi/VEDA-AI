import Link from 'next/link';
import { Ghost, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center p-4">
      <div className="max-w-md w-full">
        <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Ghost className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404 - Not Found</h1>
        <p className="text-slate-500 mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-full px-8 bg-slate-900 text-white font-bold h-12 hover:bg-slate-800 transition-all">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
