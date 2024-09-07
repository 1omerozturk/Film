import AdminPanel from'../components/Admin/AdminPanel';
import FilterMovie from '../components/FilterMovie/FilterMovie';

const AdminPage = ({searchTerm,setFilterDate,setFilter,setSortBy}) => {

  // Admin page Filter ekleme kısmına devam

  return (
    <div className="admin-page min-h-screen">

       {/* <FilterMovie setFilterDate={setFilterDate} setSortBy={setSortBy} setFilter={setFilter}  /> */}
      <AdminPanel searchTerm={searchTerm}  />
    </div>
  );
};

export default AdminPage;
