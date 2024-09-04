import AdminPanel from'../components/Admin/AdminPanel';

const AdminPage = ({searchTerm}) => {
  return (
    <div className="admin-page">
      <AdminPanel searchTerm={searchTerm}  />
    </div>
  );
};

export default AdminPage;
