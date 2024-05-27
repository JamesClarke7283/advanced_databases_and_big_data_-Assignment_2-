const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const csv = require('csv-parser');

// Function to convert Excel file to JSON
const convertExcelToJson = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData;
};

// Function to convert CSV file to JSON
const convertCsvToJson = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Paths to the files
const moviesDataPath = path.join(__dirname, 'Clean_Movies Data.xlsx');
const internetUsersDataPath = path.join(__dirname, 'InternetUsers_Cleaned.csv');
const roleTableDataPath = path.join(__dirname, 'RoleTable_Cleaned.csv');

// Convert and save JSON files
const saveJsonFiles = async () => {
  try {
    // Convert Excel and CSV files to JSON
    const moviesDataJson = convertExcelToJson(moviesDataPath);
    const internetUsersDataJson = await convertCsvToJson(internetUsersDataPath);
    const roleTableDataJson = await convertCsvToJson(roleTableDataPath);

    // Write JSON data to files
    fs.writeFileSync('Clean_Movies_Data.json', JSON.stringify(moviesDataJson, null, 2));
    fs.writeFileSync('Internet_Users_Data.json', JSON.stringify(internetUsersDataJson, null, 2));
    fs.writeFileSync('Role_Table_Data.json', JSON.stringify(roleTableDataJson, null, 2));

    console.log('JSON files have been created successfully.');
  } catch (error) {
    console.error('Error converting files to JSON:', error);
  }
};

saveJsonFiles();


// node script.js