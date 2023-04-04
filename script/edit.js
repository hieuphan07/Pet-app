"use strict";

// Assign varaible
const sideBar = document.querySelector("#sidebar");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const formContainer = document.querySelector("#container-form");
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

// Function checks empty number field
function numMustBeFilled(y, name) {
  if (isNaN(y) && isValidate) {
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

// Function checks value in small range
function mustInSmallRange(i, name) {
  if (i !== "" && (i < 1 || i > 15)) {
    alert(`${name} must be between 1 and 15!`);
    isValidate = false;
  }
}

// Function checks value in large range
function mustInLargeRange(j, name) {
  if (j !== "" && (j < 1 || j > 100)) {
    alert(`${name} must be between 1 and 100!`);
    isValidate = false;
  }
}

// Function renders table data
function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  arr.forEach((curr) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                  <th scope="row">${curr.id}</th>
                  <td>${curr.name}</td>
                  <td>${curr.age}</td>
                  <td>${curr.type}</td>
                  <td>${curr.weight} kg</td>
                  <td>${curr.length} cm</td>
                  <td>${curr.breed}</td>
                  <td class="text-center">
                    <i class="bi bi-square-fill" style="color: ${
                      curr.color
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      curr.vaccinated
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      curr.dewormed
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      curr.sterilized
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td>${new Date(curr.date).getDate()}/ ${
      new Date(curr.date).getMonth() + 1
    }/ ${new Date(curr.date).getFullYear()}</td>
                  <td>
                  <button class="btn btn-warning" onclick="startEditPet('${
                    curr.id
                  }')">Edit</button>
                  </td>
                  `;
    tableBodyEl.appendChild(row);
  });
}

// Function renders breeds
function renderBreed(arr) {
  breedInput.innerHTML = "<option>Select Breed</option>";
  arr.forEach((curr) => {
    const option = document.createElement("option");
    option.innerHTML = `${curr.breed}`;
    breedInput.appendChild(option);
  });
}

// Render breeds depend on type selected
const typeBreedFilter = function () {
  switch (typeInput.value) {
    case "Cat":
      const catBreed = breedArr.filter((cur) => cur.type === "Cat");
      renderBreed(catBreed);
      break;
    case "Dog":
      const dogBreed = breedArr.filter((cur) => cur.type === "Dog");
      renderBreed(dogBreed);
      break;
    default:
      const selectBreed = [];
      renderBreed(selectBreed);
      break;
  }
};

// Function edits pets
function startEditPet(id) {
  formContainer.classList.remove("hide");
  petArr.forEach((curr) => {
    if (id === curr.id) {
      idInput.value = curr.id;
      nameInput.value = curr.name;
      ageInput.value = curr.age;
      typeInput.value = curr.type;
      weightInput.value = curr.weight;
      lengthInput.value = curr.length;
      colorInput.value = curr.color;
      typeBreedFilter();
      breedInput.value = curr.breed;
      vaccinatedInput.checked = curr.vaccinated;
      dewormedInput.checked = curr.dewormed;
      sterilizedInput.checked = curr.sterilized;
    }
  });
}

// Loading start page
renderTableData(petArr);

// Submit button presed
submitBtn.addEventListener("click", function () {
  // Validate data
  function validateData() {
    // No field is missed
    strMustBeFilled(nameInput.value, "Name");
    strMustBeFilled(ageInput.value, "Age");
    mustBeSelected(typeInput.value, "Type");
    strMustBeFilled(weightInput.value, "Weight");
    strMustBeFilled(lengthInput.value, "Length");
    mustBeSelected(breedInput.value, "Breed");

    // Age must be between 1 and 15!
    mustInSmallRange(ageInput.value, "Age");
    // Weight must be between 1 and 15!
    mustInSmallRange(weightInput.value, "Weight");
    // Length must be between 1 and 100!
    mustInLargeRange(lengthInput.value, "Length");

    return isValidate;
  }

  let validate = validateData();

  if (validate) {
    petArr.forEach((curr) => {
      if (curr.id === idInput.value) {
        curr.name = nameInput.value;
        curr.age = ageInput.value;
        curr.type = typeInput.value;
        curr.weight = weightInput.value;
        curr.length = lengthInput.value;
        curr.color = colorInput.value;
        curr.breed = breedInput.value;
        curr.vaccinated = vaccinatedInput.checked;
        curr.dewormed = dewormedInput.checked;
        curr.sterilized = sterilizedInput.checked;
      }
    });
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
    formContainer.classList.add("hide");
  }

  // Reset validation after fail
  isValidate = true;
});
