const submitBtn = document.getElementById("submit") as HTMLInputElement;
const form = document.getElementById("form") as HTMLFormElement;
const table = document.getElementById("myTable") as HTMLTableElement;
let fullName = document.getElementById("fullName") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let phoneNumber = document.getElementById("number") as HTMLInputElement;
const newId = Math.floor(Math.random() * 1000000000);
type Bio = {
  fullName: string;
  phoneNumber: string;
  email: string;
  id: number;
};

class Biodata implements Bio {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public email: string,
    public id: number
  ) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }
}
let isValid = true;
let data: {}[] = [];
const key: string = "biodata";
const currentData = localStorage.getItem(key) ?? "";
let bioDataList: Bio[] = currentData ? JSON.parse(currentData) : [];
console.log(bioDataList);

function renderData(arr: Bio[]): void {
  arr.map((item: Bio) => {
    const newRow = document.createElement("tr");
    const tabledata1 = document.createElement("td");
    const tabledata2 = document.createElement("td");
    const tabledata3 = document.createElement("td");
    const tabledata4 = document.createElement("td");
    const editbutton = document.createElement("button");
    const deletebutton = document.createElement("button");
    editbutton.textContent = "Edit";
    deletebutton.textContent = "Delete";
    editbutton.addEventListener("click", () => handleEdit(item));
    deletebutton.addEventListener("click", () => handleDelete(item));
    tabledata1.textContent = item.fullName;
    tabledata2.textContent = item.email;
    tabledata3.textContent = item.phoneNumber;
    tabledata4.append(editbutton, deletebutton);

    if (isValid) {
      newRow.append(tabledata1, tabledata2, tabledata3, tabledata4);
      table.append(newRow);
    } else {
      console.log("NOt valid content");
    }
  });
}
function handleEdit(person: Bio) {
  console.log(person);

  fullName.value = person.fullName;
  email.value = person.email;
  phoneNumber.value = person.phoneNumber;
  editMode = true;
  editPersonId = person.id;
}
function handleDelete(perosn: Bio) {
  bioDataList = bioDataList.filter((person) => person.id !== perosn.id);
  localStorage.setItem(key, JSON.stringify(bioDataList));
  // console.log(person.id);
  console.log(bioDataList);
  clearData();
  renderData(bioDataList);
}
let editMode: boolean = false;
let editPersonId: number | null;

submitBtn.addEventListener("click", (e) => {
  if (editMode && editPersonId !== null) {
    console.log(editMode, "editMOde", editPersonId, "edotPersonId");

    const personIndex = bioDataList.findIndex(
      (person) => person.id === editPersonId
    );

    if (personIndex > -1) {
      bioDataList[personIndex].fullName = fullName.value;
      bioDataList[personIndex].email = email.value;
      bioDataList[personIndex].phoneNumber = phoneNumber.value;
      localStorage.setItem(key, JSON.stringify(bioDataList));
      editMode = false;
      editPersonId = null;
      clearData();
      clearInput();
    }
  } else {
    e.preventDefault();
    if (fullName.value == "") {
      throwError("fullNameError", "Name is required");
      isValid = false;
    } else {
      isValid = true;
      clearErrors();
    }

    if (!validateEmail(email.value)) {
      throwError("emailError", "Enter Valid Email");
      isValid = false;
    } else {
      isValid = true;

      clearErrors();
    }
    if (!validatePhoneNumber(phoneNumber.value)) {
      throwError("phoneNumberError", "Enter correct Number");
      isValid = false;
    } else {
      isValid = true;

      clearErrors();
    }

    const newBiodata: Bio = {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      id: Math.floor(Math.random() * 1000000000),
    };
    console.log(newBiodata);

    if (!isValid) {
      console.log("data is not valid");
      return;
    } else {
      bioDataList.push(newBiodata);
      localStorage.setItem(key, JSON.stringify(bioDataList));

      clearData();
      clearInput();
      renderData(bioDataList);
    }
  }
});

function clearData() {
  let td = document.querySelectorAll("td");
  td.forEach((item) => {
    item.textContent = "";
  });
}

function validateEmail(email: string) {
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailPattern.test(email)) {
    return email;
  } else {
    return null;
  }
}
function validatePhoneNumber(phoneNumber: string) {
  let numberPattern = /^(\+977)?[9][6-9]\d{8}$/;
  if (numberPattern.test(phoneNumber)) {
    return phoneNumber;
  } else {
    return null;
  }
}
function throwError(elementId: string, message: string) {
  let errorElem = document.getElementById(elementId) as HTMLElement;
  errorElem.textContent = message;
}
function clearErrors() {
  throwError("fullNameError", "");
  throwError("emailError", "");

  throwError("phoneNumberError", "");
}
function clearInput() {
  fullName.value = "";
  email.value = "";
  phoneNumber.value = "";
}

//to render data
renderData(bioDataList);

const showForm = document.getElementById("showFormButton") as HTMLButtonElement;
const fromContainer = document.getElementById(
  "form-body-container"
) as HTMLElement;
showForm.addEventListener("click", () => {
  console.log("clicked");

  fromContainer.style.display = "block";
});
