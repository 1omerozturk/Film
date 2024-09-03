import { lazy, Suspense } from 'react';
const AdminPanel=lazy(()=>import('../components/Admin/AdminPanel'));

const AdminPage = ({searchTerm}) => {
  return (
    <div className="admin-page">
      <Suspense fallback={<div>Loading component...</div>}>
      <AdminPanel searchTerm={searchTerm}  />
      </Suspense>
    </div>
  );
};

export default AdminPage;
