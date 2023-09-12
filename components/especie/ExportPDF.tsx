// components/ExportPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

const PdfDocument = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.text}>Hello, this is a PDF generated using React and Next.js!</Text>
      </View>
    </Page>
  </Document>
);

const ExportPDF = () => {

  return (
    <div className='pr-2'>
        <PDFDownloadLink 
        document={<PdfDocument />} fileName="especies.pdf"
        className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
        >
            {({ blob, url, loading, error }) => 
                
                (loading ? 'Loading document...' : 'Export PDF')
            
            }
        </PDFDownloadLink>
    </div>
  );
};

export default ExportPDF;