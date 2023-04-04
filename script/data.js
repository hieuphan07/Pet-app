"use strict";

// Assign buttons
const inputFile = document.querySelector("#input-file");
const importBtn = document.querySelector("#import-btn");
const exportBtn = document.querySelector("#export-btn");

// Get data from local storage
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// Save data to file
function saveDataToFile() {
  var blob = new Blob([JSON.stringify(petArr)], {
    type: "text/json;charset=utf-8",
  });
  saveAs(blob, "petArrFile.json");
}

// Export button pressed
exportBtn.addEventListener("click", function () {
  saveDataToFile();
});

// Import button pressed
importBtn.addEventListener("click", function () {
  const file = inputFile.files[0];

  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");

  reader.onload = () => {
    let fileContents = JSON.parse(reader.result);

    // Overwrite the data have the same id
    petArr.forEach((currData) => {
      fileContents.forEach((currImport) => {
        if (currImport.id === currData.id) {
          currData.id = currImport.id;
          currData.name = currImport.name;
          currData.age = currImport.age;
          currData.type = currImport.type;
          currData.weight = currImport.weight;
          currData.length = currImport.length;
          currData.color = currImport.color;
          currData.breed = currImport.breed;
          saveToStorage("petArr", JSON.stringify(petArr));
        }
      });
    });

    // Filter the complete new data then add to the table data
    for (let i = 0; i < petArr.length; i++) {
      fileContents = fileContents.filter(
        (currImport) => currImport.id !== petArr[i].id
      );
    }
    fileContents.forEach((currImport) => petArr.push(currImport));
    saveToStorage("petArr", JSON.stringify(petArr));
  };
});
