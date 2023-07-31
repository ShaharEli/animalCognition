const fs = require("fs");
const path = require("path");
const csvWriter = require("csv-writer").createObjectCsvWriter;

const dataFolderPath = "../data/"; // Replace with the actual path to your data folder
const outputFilePath = "../data/output.csv"; // Replace with the desired output CSV file path

const csvHeader = [
  { id: "simulationId", title: "Simulation ID" },
  { id: "generation", title: "Generation" },
  { id: "id", title: "ID" },
  { id: "creatures_initial_amount", title: "Initial Amount" },
  { id: "aggressive_ratio", title: "Aggressive Ratio" },
  { id: "aggressive_amount", title: "Aggressive Amount" },
  { id: "friendly_amount", title: "Friendly Amount" },
  { id: "food_amount", title: "Food Amount" },
];

const csvWriterOptions = {
  path: outputFilePath,
  header: csvHeader,
};

function processJSONFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);

  return Object.entries(jsonData)
    .map(([simulationId, simulationData]) => {
      return simulationData.map(
        ({
          id,
          generation,
          creatures_initial_amount,
          aggressive_ratio,
          aggressive_amount,
          friendly_amount,
          food_amount,
        }) => {
          return {
            simulationId,
            generation,
            id,
            creatures_initial_amount,
            aggressive_ratio,
            aggressive_amount,
            friendly_amount,
            food_amount,
          };
        }
      );
    })
    .flat();
}

function processAllJSONFiles(dataFolderPath) {
  const fileNames = fs.readdirSync(dataFolderPath);
  const allData = [];

  fileNames.forEach((fileName) => {
    if (fileName.startsWith("data-rate-") && fileName.endsWith(".json")) {
      const filePath = path.join(dataFolderPath, fileName);
      const data = processJSONFile(filePath);
      allData.push(...data);
    }
  });

  return allData;
}

function generateCSVFile(data) {
  const csvWriterInstance = csvWriter(csvWriterOptions);
  csvWriterInstance
    .writeRecords(data)
    .then(() => console.log("CSV file generated successfully."))
    .catch((error) => console.error("Error generating CSV file:", error));
}

// Process all JSON files and generate CSV file
const allData = processAllJSONFiles(dataFolderPath);
generateCSVFile(allData);
