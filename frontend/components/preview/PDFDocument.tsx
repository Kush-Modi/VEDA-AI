import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1e293b',
    paddingBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 'extrabold',
    marginBottom: 5,
    textTransform: 'uppercase',
    color: '#0f172a',
  },
  examTitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  studentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 15,
    borderRadius: 5,
  },
  studentField: {
    flexDirection: 'row',
    gap: 5,
  },
  studentLabel: {
    fontWeight: 'bold',
    color: '#334155',
  },
  studentLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    width: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  instruction: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#475569',
  },
  questionRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 5,
  },
  qNumber: {
    width: 30,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  qContent: {
    flex: 1,
  },
  qText: {
    color: '#1e293b',
    marginBottom: 4,
  },
  qMeta: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    color: '#475569',
  },
  qMarks: {
    width: 50,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#0f172a',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  }
});

interface PDFDocumentProps {
  paper: any;
  user?: any;
}

export const GeneratedPDF = ({ paper, user }: PDFDocumentProps) => {
  const schoolName = user?.school || 'DELHI PUBLIC SCHOOL';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <View style={styles.headerLeft}>
            <Text style={styles.schoolName}>{schoolName}</Text>
            <Text style={styles.examTitle}>Term Assessment Examination</Text>
          </View>
        </View>
          
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Subject</Text>
            <Text style={styles.metaValue}>{paper.subject || 'Subject'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Class</Text>
            <Text style={styles.metaValue}>{paper.class || 'Class'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Time Allowed</Text>
            <Text style={styles.metaValue}>{paper.timeAllowed || '2 Hours'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Max Marks</Text>
            <Text style={styles.metaValue}>{paper.maximumMarks || '100'}</Text>
          </View>
        </View>
        
        <View style={styles.studentSection} wrap={false}>
          <View style={styles.studentField}>
            <Text style={styles.studentLabel}>Name:</Text>
            <View style={[styles.studentLine, { width: 150 }]} />
          </View>
          <View style={styles.studentField}>
            <Text style={styles.studentLabel}>Date:</Text>
            <View style={[styles.studentLine, { width: 80 }]} />
          </View>
          <View style={styles.studentField}>
            <Text style={styles.studentLabel}>Roll No:</Text>
            <View style={[styles.studentLine, { width: 60 }]} />
          </View>
        </View>

        {paper.sections?.map((section: any, idx: number) => {
          // Calculate the starting index for questions in this section
          const startIndex = paper.sections.slice(0, idx).reduce((acc: number, curr: any) => acc + (curr.questions?.length || 0), 0) + 1;
          
          return (
            <View key={idx} style={styles.section} wrap={false}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.instruction && (
                  <Text style={styles.instruction}>{section.instruction}</Text>
                )}
              </View>
              
              {section.questions?.map((q: any, qIdx: number) => (
                <View key={qIdx} style={styles.questionRow} wrap={false}>
                  <Text style={styles.qNumber}>Q{startIndex + qIdx}.</Text>
                  <View style={styles.qContent}>
                    <Text style={styles.qText}>{q.text}</Text>
                    <View style={styles.qMeta}>
                      {q.difficulty && <Text style={styles.badge}>{q.difficulty}</Text>}
                    </View>
                  </View>
                  <Text style={styles.qMarks}>[{q.marks} M]</Text>
                </View>
              ))}
            </View>
          );
        })}

        <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages} - Generated by VedaAI`
        )} fixed />
      </Page>
    </Document>
  );
};
