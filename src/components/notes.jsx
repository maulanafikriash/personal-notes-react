import React from 'react';

const Catatan = ({ catatan, onDelete, onPindahkan, diArsip }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2 className="fs-3">{catatan.title}</h2>
        <p className="card-text">{catatan.body}</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-danger me-md-2" onClick={() => onDelete(catatan.id, diArsip)}>
          Hapus
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onPindahkan(catatan.id, diArsip)}
        >
          {diArsip ? 'Kembalikan' : 'Arsipkan'}
        </button>
        </div>
      </div>
    </div>
  );
};

export default Catatan;
