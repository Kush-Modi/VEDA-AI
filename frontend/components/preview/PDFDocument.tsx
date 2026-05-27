import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    textAlign: 'center',
  },
  schoolName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  examTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  studentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  instruction: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  questionRow: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 11,
  },
  qNumber: {
    width: 25,
    fontWeight: 'bold',
  },
  qText: {
    flex: 1,
  },
  qMarks: {
    width: 40,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  }
});

interface PDFDocumentProps {
  paper: any;
}

export const GeneratedPDF = ({ paper }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.schoolName}>Delhi Public School</Text>
        <Text style={styles.examTitle}>Assessment Paper</Text>
      </View>
      
      <View style={styles.studentSection}>
        <Text>Name: ______________________</Text>
        <Text>Date: ______________________</Text>
        <Text>Class: ______________________</Text>
      </View>

      {paper.sections?.map((section: any, idx: number) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.instruction && (
            <Text style={styles.instruction}>{section.instruction}</Text>
          )}
          
          {section.questions?.map((q: any, qIdx: number) => (
            <View key={qIdx} style={styles.questionRow}>
              <Text style={styles.qNumber}>Q{qIdx + 1}.</Text>
              <Text style={styles.qText}>{q.text}</Text>
              <Text style={styles.qMarks}>[{q.marks} M]</Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);
