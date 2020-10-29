import React from 'react';

import '../styles/newProduct.css';

export default function NewProduct() {
  const drugstoreName = localStorage.getItem('drugstoreName');
  const drugstoreEmail = localStorage.getItem('drugstoreEmail');
  return(
    <div>
      <h1>New Products</h1>
      <span>{drugstoreName}</span>
      <span>{drugstoreEmail}</span>
    </div>
  );
}