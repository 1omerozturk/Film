import { useState } from 'react';
import AdminPanel from'../components/Admin/AdminPanel';
import FilterMovie from '../components/FilterMovie/FilterMovie';

const AdminPage = ({searchTerm}) => {
const [filter,setFilter]=useState('');
const [sortBy,setSortBy]=useState('');
const [filterDate,setFilterDate]=useState('');

  // Admin page Filter ekleme kısmına devam

  return (
    <div className="admin-page min-h-screen">

       <FilterMovie setFilterDate={setFilterDate} setSortBy={setSortBy} setFilter={setFilter}  />
      <AdminPanel searchTerm={searchTerm} filter={filter}  sortBy={sortBy} filterDate={filterDate} />

    </div>
  );
};

export default AdminPage;
