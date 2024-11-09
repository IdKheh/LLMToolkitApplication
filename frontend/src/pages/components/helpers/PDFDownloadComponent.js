import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import STRINGS from '../../../Strings';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  header: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  listItem: {
    fontSize: 11,
    marginBottom: 6,
    marginLeft: 10
  },
  bold: {
    fontWeight: 'bold'
  }
});

const getDisplayedValue = (value, name) => {
  if (name === STRINGS.POSTaggingName) {
      var returnedString = "\n";
      Object.keys(value).forEach(key => {
        returnedString += `\t ${key}: ${value[key]} \n`;
      });
      return <>{returnedString}</>;
  }
  if (name === STRINGS.GERLanguageToolName || name === STRINGS.GERIKorektorName) {
      value = parseFloat(value[0]);
      value = Math.round(value * 100) / 100;
      value = value + "%";
  }
  if (name === STRINGS.spellCheckerName) {
      value = Object.keys(value).length;
  }
  
  return (
      <>
          {value}
      </>
  );
};

const PDFDocument = ({ result }) => (
  <Document>
    <Page style={styles.page} size="A4">
      <Text style={styles.title}>
        {STRINGS.PDFTitle}
      </Text>
      {result.map((model, modelIndex) => (
        <View key={modelIndex}>
          <Text style={styles.header}>
            Model name: {model.nameModel}
          </Text>
          {model.methodsResult.map((method, methodIndex) => (
            <Text key={methodIndex} style={styles.listItem}>
              <Text style={styles.bold}>{method.nameMethod}</Text>
              , value: {getDisplayedValue(method.value, method.nameMethod)}
            </Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

const PDFDownloadComponent = ({ result }) => (
  <PDFDownloadLink
    document={<PDFDocument result={result} />}
    fileName={STRINGS.reportNamePDF}
  >
    {({ loading }) => (
      <button className="submitButton">
        {loading ? STRINGS.loadingPDFText : STRINGS.downloadPDF}
      </button>
    )}
  </PDFDownloadLink>
)

export default PDFDownloadComponent;