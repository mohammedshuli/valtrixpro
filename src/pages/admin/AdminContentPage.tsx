import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <div className="section-container py-10">
        <div className="card p-8">
          <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-3">Content</h1>
          <p className="text-gray-600 mb-6">Content editing is not enabled for this release. Site content is managed in the source code.</p>
          <Link to={ROUTES.ADMIN} className="btn btn-secondary">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}
