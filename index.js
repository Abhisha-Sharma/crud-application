var _a;
var submitBtn = document.getElementById("submit");
var form = document.getElementById("form");
var table = document.getElementById("myTable");
var fullName = document.getElementById("fullName");
var email = document.getElementById("email");
var phoneNumber = document.getElementById("number");
var newId = Math.floor(Math.random() * 1000000000);
var Biodata = /** @class */ (function () {
    function Biodata(fullName, phoneNumber, email, id) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.id = id;
    }
    return Biodata;
}());
var isValid = true;
var data = [];
var key = "biodata";
var currentData = (_a = localStorage.getItem(key)) !== null && _a !== void 0 ? _a : "";
var bioDataList = currentData ? JSON.parse(currentData) : [];
console.log(bioDataList);
function renderData(arr) {
    arr.map(function (item) {
        var newRow = document.createElement("tr");
        var tabledata1 = document.createElement("td");
        var tabledata2 = document.createElement("td");
        var tabledata3 = document.createElement("td");
        var tabledata4 = document.createElement("td");
        var editbutton = document.createElement("button");
        var deletebutton = document.createElement("button");
        editbutton.textContent = "Edit";
        deletebutton.textContent = "Delete";
        editbutton.addEventListener("click", function () { return handleEdit(item); });
        deletebutton.addEventListener("click", function () { return handleDelete(item); });
        tabledata1.textContent = item.fullName;
        tabledata2.textContent = item.email;
        tabledata3.textContent = item.phoneNumber;
        tabledata4.append(editbutton, deletebutton);
        if (isValid) {
            newRow.append(tabledata1, tabledata2, tabledata3, tabledata4);
            table.append(newRow);
        }
        else {
            console.log("NOt valid content");
        }
    });
}
function handleEdit(person) {
    console.log(person);
    fullName.value = person.fullName;
    email.value = person.email;
    phoneNumber.value = person.phoneNumber;
    editMode = true;
    editPersonId = person.id;
}
function handleDelete(perosn) {
    bioDataList = bioDataList.filter(function (person) { return person.id !== perosn.id; });
    localStorage.setItem(key, JSON.stringify(bioDataList));
    // console.log(person.id);
    console.log(bioDataList);
    clearData();
    renderData(bioDataList);
}
var editMode = false;
var editPersonId;
submitBtn.addEventListener("click", function (e) {
    if (editMode && editPersonId !== null) {
        console.log(editMode, "editMOde", editPersonId, "edotPersonId");
        var personIndex = bioDataList.findIndex(function (person) { return person.id === editPersonId; });
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
    }
    else {
        e.preventDefault();
        if (fullName.value == "") {
            throwError("fullNameError", "Name is required");
            isValid = false;
        }
        else {
            isValid = true;
            clearErrors();
        }
        if (!validateEmail(email.value)) {
            throwError("emailError", "Enter Valid Email");
            isValid = false;
        }
        else {
            isValid = true;
            clearErrors();
        }
        if (!validatePhoneNumber(phoneNumber.value)) {
            throwError("phoneNumberError", "Enter correct Number");
            isValid = false;
        }
        else {
            isValid = true;
            clearErrors();
        }
        var newBiodata = {
            fullName: fullName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            id: Math.floor(Math.random() * 1000000000),
        };
        console.log(newBiodata);
        if (!isValid) {
            console.log("data is not valid");
            return;
        }
        else {
            bioDataList.push(newBiodata);
            localStorage.setItem(key, JSON.stringify(bioDataList));
            clearData();
            clearInput();
            renderData(bioDataList);
        }
    }
});
function clearData() {
    var td = document.querySelectorAll("td");
    td.forEach(function (item) {
        item.textContent = "";
    });
}
function validateEmail(email) {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailPattern.test(email)) {
        return email;
    }
    else {
        return null;
    }
}
function validatePhoneNumber(phoneNumber) {
    var numberPattern = /^(\+977)?[9][6-9]\d{8}$/;
    if (numberPattern.test(phoneNumber)) {
        return phoneNumber;
    }
    else {
        return null;
    }
}
function throwError(elementId, message) {
    var errorElem = document.getElementById(elementId);
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
renderData(bioDataList);
var showForm = document.getElementById("showFormButton");
var fromContainer = document.getElementById("form-body-container");
showForm.addEventListener("click", function () {
    console.log("clicked");
    fromContainer.style.display = "block";
});
