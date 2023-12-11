import React from 'react';

const DaftarCatatanArsip = ({ catatanArsip, onPindahkan, onDelete }) => {
  return (
    <div>
      <h2 className="mt-5 pb-2">Catatan yang Diarsipkan</h2>
        {catatanArsip.map((note) => (
          <div key={note.id} className="border p-3 mb-4">
            <h3>{note.title}</h3>
            <p>{note.body}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-danger me-md-2"
              onClick={() => onDelete(note.id, true)}
            >
              Hapus
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onPindahkan(note.id, true)}
            >
              Pindahkan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DaftarCatatanArsip;
