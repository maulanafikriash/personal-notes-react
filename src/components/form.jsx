import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const FormTambahCatatan = ({ onTambahCatatan }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [sisaKarakter, setSisaKarakter] = useState(50);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleJudulChange = (change) => {
    const judulBaru = change.target.value;
    setJudul(judulBaru);
    setSisaKarakter(50 - judulBaru.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!judul.trim() || !isi.trim()) {
        setAlertMessage('Harap isi baik judul maupun catatan, sebelum menambahkan catatan.');
        setShowAlert(true);
        return;
      }
    
      if (judul.length > 50) {
        setAlertMessage('Judul catatan melebihi 50 karakter. Silakan singkat judul catatan Anda.');
        setShowAlert(true);
        return;
      }

    onTambahCatatan({ title: judul, body: isi });
    setJudul('');
    setIsi('');
    setSisaKarakter(50);
  };

  return (
    <div className="p-4"> 
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Judul"
            value={judul}
            onChange={handleJudulChange} 
          />
        <p className="fst-italic">Jumlah karakter tersisa: {sisaKarakter}</p>
        </div>
        <div className="mb-3">
          <textarea
            rows="5"
            className="form-control"
            placeholder="Isi Catatan"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-primary">Tambah Catatan</button>
        </div>
      </form>

      <Toast    
        show={showAlert}
        onClose={() => setShowAlert(false)}
        delay={4000}
        autohide
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}
      >       
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Pesan</strong>
        </Toast.Header>

        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <Toast.Body>{alertMessage}</Toast.Body>
        </div>
      </Toast>

    </div>
  );
};

export default FormTambahCatatan;
