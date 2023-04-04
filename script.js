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
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const tableBodyEl = document.getElementById("tbody");

let isValidate = true;
let healthyCheck = true;

// Get data from local storage
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

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

// Function checks unique value
function mustBeUnique(uniq) {
  if (uniq !== "") {
    for (let i = 0; i < petArr.length; i++) {
      if (uniq === petArr[i].id) {
        alert("ID must be unique!");
        isValidate = false;
        break;
      }
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

// Function resets form field to default
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#878787";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Function renders table data
function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                  <th scope="row">${arr[i].id}</th>
                  <td>${arr[i].name}</td>
                  <td>${arr[i].age}</td>
                  <td>${arr[i].type}</td>
                  <td>${arr[i].weight} kg</td>
                  <td>${arr[i].length} cm</td>
                  <td>${arr[i].breed}</td>
                  <td class="text-center">
                    <i class="bi bi-square-fill" style="color: ${
                      arr[i].color
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      arr[i].vaccinated
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      arr[i].dewormed
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td class="text-center">
                    <i class="bi ${
                      arr[i].sterilized
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i>
                  </td>
                  <td>${new Date(arr[i].date).getDate()}/ ${
      new Date(arr[i].date).getMonth() + 1
    }/ ${new Date(arr[i].date).getFullYear()}</td>
                  <td>
                  <button class="btn btn-danger" onclick="deletePet('${
                    arr[i].id
                  }')">Delete</button>
                  </td>
                  `;
    tableBodyEl.appendChild(row);
  }
}

// Function deletes table data
function deletePet(petID) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", JSON.stringify(petArr));
        renderTableData(petArr);
      }
    }
  }
}

// Function adds healthy pets to array
function addHealthyPets(pArr, hArr) {
  for (let i = 0; i < pArr.length; i++) {
    if (pArr[i].vaccinated && pArr[i].dewormed && pArr[i].sterilized) {
      hArr.push(pArr[i]);
    }
  }
}

// Loading start page
saveToStorage("petArr", JSON.stringify(petArr));
clearInput();
renderTableData(petArr);

// Submit button pressed
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // Validate data
  function validateData(data) {
    // No field is missed
    strMustBeFilled(data.id, "ID");
    strMustBeFilled(data.name, "Name");
    numMustBeFilled(data.age, "Age");
    mustBeSelected(data.type, "Type");
    numMustBeFilled(data.weight, "Weight");
    numMustBeFilled(data.length, "Length");
    mustBeSelected(data.breed, "Breed");

    // ID must be unique!
    mustBeUnique(data.id);
    // Age must be between 1 and 15!
    mustInSmallRange(data.age, "Age");
    // Weight must be between 1 and 15!
    mustInSmallRange(data.weight, "Weight");
    // Length must be between 1 and 100!
    mustInLargeRange(data.length, "Length");

    return isValidate;
  }

  let validate = validateData(data);

  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }

  // Reset validation after fail
  isValidate = true;
});

// Healthy button pressed
healthyBtn.addEventListener("click", function () {
  const healthyPetArr = [];
  if (healthyCheck) {
    addHealthyPets(petArr, healthyPetArr);
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pets";
    healthyCheck = true;
  }
});

/////////////////////////////////////////////////
///////////// Add new funcitons /////////////////
/////////////////////////////////////////////////

// Add animation
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

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
