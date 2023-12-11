import React, { useState } from 'react';
import { getInitialData } from './utils/index';
import Catatan from './components/notes';
import FormTambahCatatan from './components/form';
import DaftarCatatanArsip from './components/arsip';
import Footer from './components/footer';

const App = () => {
  const dataAwal = getInitialData();
  const [catatan, setCatatan] = useState(dataAwal);
  const [catatanArsip, setCatatanArsip] = useState([]);
  const [kataKunciPencarian, setKataKunciPencarian] = useState('');
  
  const tambahCatatan = (newCatatan) => {
    setCatatan([...catatan, { ...newCatatan, id: +new Date() }]);
  };
  
  const hapusCatatan = (id, diArsip) => {
    if (diArsip) {
      setCatatanArsip(catatanArsip.filter((note) => note.id !== id));
    } else {
      setCatatan(catatan.filter((note) => note.id !== id));
    }
  };
  
  const pindahkanCatatan = (id, diArsip) => {
    if (diArsip) {
      const catatanPindahkan = catatanArsip.find((note) => note.id === id);
      setCatatanArsip(catatanArsip.filter((note) => note.id !== id));
      setCatatan([...catatan, catatanPindahkan]);
    } else {
        const catatanPindahkan = catatan.find((note) => note.id === id);
        setCatatan(catatan.filter((note) => note.id !== id));
        setCatatanArsip([...catatanArsip, catatanPindahkan]);
    }
  };
  
  const catatanTersaring = catatan.filter((note) =>
    note.title.toLowerCase().includes(kataKunciPencarian.toLowerCase())
  );
  
  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand m-2 h1 text-uppercase fs-4">Aplikasi Catatan Pribadi</span>       
        </div>        
      </nav>
        <div className="container mt-4">
          <FormTambahCatatan onTambahCatatan={tambahCatatan} />
          <input
            type="text"
            className="form-control mb-3 mt-4"
            placeholder="Cari catatan..."
            value={kataKunciPencarian}
            onChange={(e) => setKataKunciPencarian(e.target.value)}
          />
        <div className="row">
          {catatanTersaring.length > 0 ? (
            catatanTersaring.map((note) => (
              <div className="col-md-4" key={note.id}>
                <Catatan
                  catatan={note}
                  onDelete={hapusCatatan}
                  onPindahkan={pindahkanCatatan}
                  diArsip={false}
                />
              </div>
            ))
          ) : (
            <p>Catatan Tidak Tersedia</p>
          )}
        </div>
          {catatanArsip.length > 0 ? (
            <DaftarCatatanArsip
              catatanArsip={catatanArsip}
              onPindahkan={pindahkanCatatan}
              onDelete={hapusCatatan}
            />
          ) : (
            <div className="mt-5 mb-5">
              <h2>Catatan yang Diarsipkan</h2>
              <p>Tidak Ada Catatan</p>
            </div>
          )}
        </div>
      <Footer />
    </div>
  );
};
      
export default App;
