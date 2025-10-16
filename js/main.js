var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var tableBody = document.getElementById("tableBody");
var alertModal = new bootstrap.Modal(document.getElementById("alertModal"));

var bookmarksList = [];

var nameRegex = /.{3,}/;
var urlRegex =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

if (localStorage.getItem("bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  if (
    validateInput(siteNameInput, nameRegex) &&
    validateInput(siteUrlInput, urlRegex)
  ) {
    var bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks();
    clearForm();
  } else {
    alertModal.show();
  }
}

function displayBookmarks() {
  var cartoona = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    cartoona += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarksList[i].name}</td>
                <td>
                    <button class="btn btn-success" onclick="visitSite(${i})">
                        <i class="fa-solid fa-eye pe-2"></i> Visit
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="deleteBookmark(${i})">
                        <i class="fa-solid fa-trash-can pe-2"></i> Delete
                    </button>
                </td>
            </tr>
        `;
  }
  tableBody.innerHTML = cartoona;
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  displayBookmarks();
}

function visitSite(index) {
  var url = bookmarksList[index].url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  window.open(url, "_blank");
}

function validateInput(element, regex) {
  var test = regex.test(element.value);
  if (test) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
  return test;
}

submitBtn.addEventListener("click", addBookmark);

siteNameInput.addEventListener("input", function () {
  validateInput(siteNameInput, nameRegex);
});

siteUrlInput.addEventListener("input", function () {
  validateInput(siteUrlInput, urlRegex);
});
