import Papa from 'papaparse';

interface CSVRow {
  [key: string]: string | number | boolean;
}

function convertToCSV(data: CSVRow[], config?: any): string {
  if (data?.length === 0) {
    throw new Error('Data array is empty');
  }

  // Extract column names from the first row (object keys)
  const columns = Object.keys(data[0]);

  // Convert data array to array of arrays
  const dataArray: (string | number | boolean)[][] = [];
  dataArray.push(columns);

  data.forEach((obj) => {
    const values = columns.map((col) => obj[col]);
    dataArray.push(values);
  });

  return Papa.unparse(dataArray, config);
}

function convertToISO88591(text: string) {
  const encoder = new TextEncoder();
  return encoder.encode(text);
}

export function exportToCSV(data: CSVRow[], filename: string, config?: any): void {
    var csvData = convertToCSV(data, config);
    //var link;
    const encoding = config?.encoding ? config?.encoding : 'utf-8'

    if (csvData == null) return;
    filename = filename || 'export.csv';
    const csvBlob = new Blob([csvData], { type: `text/csv;charset=${encoding};` });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}