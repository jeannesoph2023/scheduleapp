import React from 'react';
import jsPDF from 'jspdf';

const PDFGenerator = () => {
  const generatePDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Hello, this is a sample PDF document!', 10, 10);

    // Save the PDF
    doc.save('sample.pdf');
  };

  return (
    <div>
      <h1>PDF Generator</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;