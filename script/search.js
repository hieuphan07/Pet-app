"use strict";

// Assign varaible
const sideBar = document.querySelector("#sidebar");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.querySelector("#tbody");
const findBtn = document.querySelector("#find-btn");

// Get data from local storage
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];

// Add animation
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

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

// Loading start page
renderTableData(petArr);
renderBreed(breedArr);

// Find button pressed
findBtn.addEventListener("click", function () {
  let petFilterArr = petArr;

  // Filter data from ID input
  if (typeof idInput.value.toLowerCase().trim() === "string") {
    petFilterArr = petFilterArr.filter((curr) =>
      curr.id.toLowerCase().includes(idInput.value.toLowerCase().trim())
    );
    renderTableData(petFilterArr);
  }

  // Filter data from name input
  if (typeof nameInput.value.toLowerCase().trim() === "string") {
    petFilterArr = petFilterArr.filter((curr) =>
      curr.name.toLowerCase().includes(nameInput.value.toLowerCase().trim())
    );
    renderTableData(petFilterArr);
  }

  // Filter data from type input
  if (typeInput.value !== "Select Type") {
    petFilterArr = petFilterArr.filter((curr) =>
      curr.type.includes(typeInput.value)
    );
    renderTableData(petFilterArr);
  }

  // Filter data from breed input
  if (breedInput.value !== "Select Breed") {
    petFilterArr = petFilterArr.filter((curr) =>
      curr.breed.includes(breedInput.value)
    );
    renderTableData(petFilterArr);
  }

  // Filter data from vaccinated input
  if (vaccinatedInput.checked === true) {
    petFilterArr = petFilterArr.filter((curr) => curr.vaccinated === true);
    renderTableData(petFilterArr);
  }

  // Filter data from dewormed input
  if (dewormedInput.checked === true) {
    petFilterArr = petFilterArr.filter((curr) => curr.dewormed === true);
    renderTableData(petFilterArr);
  }

  // Filter data from sterilized input
  if (sterilizedInput.checked === true) {
    petFilterArr = petFilterArr.filter((curr) => curr.sterilized === true);
    renderTableData(petFilterArr);
  }
});
