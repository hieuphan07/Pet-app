"use strict";

// Assign varaible
const sideBar = document.querySelector("#sidebar");
const breedInput = document.querySelector("#input-breed");
const typeInput = document.querySelector("#input-type");
const tableBodyEl = document.querySelector("#tbody");
const submitBtn = document.querySelector("#submit-btn");

let isValidate = true;

// Get data from local storage
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// Add animation
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

// Function checks empty string field
function strMustBeFilled(x, name) {
  if (x.trim() === "" && isValidate) {
    alert(`${name} must be filled!`);
    isValidate = false;
  }
}

// Function checks option not selected
function mustBeSelected(z, name) {
  if (isValidate) {
    switch (z) {
      case "Select Type":
      case "Select Breed":
        alert(`${name} must be selected!`);
        isValidate = false;
        break;
    }
  }
}

// Function renders breed table
function renderBreedTable(arr) {
  tableBodyEl.innerHTML = "";
  arr.forEach((curr, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                  <th scope="row">${(curr.no = index + 1)}</th>
                  <td>${curr.breed}</td>
                  <td>${curr.type}</td>
                  <td>
                  <button class="btn btn-danger" onclick="deleteBreed('${
                    curr.no
                  }')">Delete</button>
                  </td>
                  `;
    tableBodyEl.appendChild(row);
  });
}

// Function deletes table data
function deleteBreed(key) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (Number(key) === breedArr[i].no) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", JSON.stringify(breedArr));
        renderBreedTable(breedArr);
      }
    }
  }
}

// Function resets form field to default
const clearInput = () => {
  breedInput.value = "";
  typeInput.value = "Select Type";
};

// Loading start page
saveToStorage("breedArr", JSON.stringify(breedArr));
renderBreedTable(breedArr);
clearInput();

// Submit button pressed
submitBtn.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  strMustBeFilled(data.breed, "Breed");
  mustBeSelected(data.type, "Type");

  if (isValidate) {
    breedArr.push(data);
    clearInput();
    renderBreedTable(breedArr);
    saveToStorage("breedArr", JSON.stringify(breedArr));
  }

  isValidate = true;
});
