import React from "react";
import { Page, Document, StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginTop:30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: "table",
        width: "auto",
        borderColor: "#bfbfbf",
        marginBottom:15,
        marginTop:5,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "10%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
    },
    tableColFirst: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        height:"auto",
    },
    tableRowHighlighted:{
        margin:"auto",
        flexDirection:"row",
        backgroundColor:"#36a2eb",
        color:"#FFFFFF",
    },
    tableColFirstDesc: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        backgroundColor: "#036089",
        color:"#FFFFFF",
    },
    tableColHeader: {
        width: "10%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        backgroundColor: "#036089",
        color:"#FFFFFF",
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
    tableColHeaderFirst: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#bfbfbf",
        backgroundColor:  "#036089",
        color:"#FFFFFF",
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        color: "#036089",
    },
    subHeader: {
        fontSize: 14,
        marginBottom: 5,
        color: "#036089",
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    tableCellHeader: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        fontWeight: "bold",
    }
});

const PdfFile = ({ modelData, top10Data, similarPerformance, sameFamily, modelRow }) => {
    // Parse JSON strings into JavaScript objects
    const parsedModelData = JSON.parse(modelData);
    const parsedTop10Data = JSON.parse(top10Data);
    const parsedSimilarPerformance = JSON.parse(similarPerformance);
    const parsedSameFamily = JSON.parse(sameFamily);
    const parsedModelRow = JSON.parse(modelRow);

    const renderTableRows = (data) => {
        let chosenModel = parsedModelData.Author + '/' + parsedModelData.Name
        console.log("Chosen model:" ,chosenModel)
        return data.map((item, index) => (
            <View style={item.fullname === chosenModel ? styles.tableRowHighlighted : styles.tableRow} key={index}>
                {Object.keys(item).map((key, subIndex) => (
                    <View style={subIndex === 0 ? styles.tableColFirst : styles.tableCol} key={subIndex}>
                        <Text style={styles.tableCell}>
                            {typeof item[key] === 'number' ? item[key].toFixed(2) : item[key]}
                        </Text>
                    </View>
                ))}
            </View>
        ));
    };

    const renderTableHeader = (data) => {
        const keys = Object.keys(data[0]);
        return (
            <View style={styles.tableRow}>
                {keys.map((key, index) => (
                    <View style={index === 0 ? styles.tableColHeaderFirst : styles.tableColHeader} key={index}>
                        <Text style={styles.tableCellHeader}>{key}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>LLMToolkit Model Report</Text>
                <Text style={styles.subHeader}>Model summary</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Name</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData.Name}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Author</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData.Author}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Parameters</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData.Parameters}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Usage</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData.Usage}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Technology Used</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData["Technology used"]}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Language</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData.Language}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColFirstDesc}>
                            <Text style={styles.tableCell}>Leaderboard Average</Text>
                        </View>
                        <View style={styles.tableColFirst}>
                            <Text style={styles.tableCell}>{parsedModelData["Leaderboard average"]}</Text>
                        </View>
                    </View>
                </View>

                <View wrap={false}>
                <Text style={styles.subHeader}>Best models in leaderboard vs chosen model</Text>
                <View style={styles.table} wrap={false}>
                    {renderTableHeader(parsedTop10Data)}
                    {renderTableRows(parsedTop10Data)}
                </View>
                </View>
                <View wrap={false}>
                <Text style={styles.subHeader}>Similar performing models</Text>
                <View style={styles.table} wrap={false}>
                    {renderTableHeader(parsedSimilarPerformance)}
                    {renderTableRows(parsedSimilarPerformance)}
                </View>
                </View>
                
                <View wrap={false}>
                <Text style={styles.subHeader}>Same family of models</Text>
                <View style={styles.table} wrap={false}>
                    {renderTableHeader(parsedSameFamily)}
                    {renderTableRows(parsedSameFamily)}
                </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfFile;