//console.log("Wecome to KILLY NOTES");
showNotes();
// If user adds a note,add it to the local storage

//ADD NOTES
let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", function (e) {
	let addTxt = document.querySelector("#addTxt");
	let addTitle = document.getElementById("addTitle");
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	let myObj = {
		title: addTitle.value,
		text: addTxt.value,
	};
	notesObj.push(myObj);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value = "";
	addTitle.value = "";
	//	console.log(notesObj);
	showNotes();
});

//DISPLAY NOTES
function showNotes() {
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	let html = "";
	notesObj.forEach(function (element, index) {
		html += ` 
        <div class="card my-2 mx-4 notecard" style="width: 18rem;">
<div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.text}</p>
    <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
</div>
</div>`;
	});
	let notesElm = document.getElementById("notes");

	if (notesObj.length != 0) {
		notesElm.innerHTML = html;
	} else {
		notesElm.innerHTML = `<h2>Nothing to show here.Use add  a note to add notes<h2>`;
	}
}

//Delete NOTES
function deleteNote(index) {
	//	console.log("I am deleting", index);
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index, 1);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	showNotes();
}

//SEARCH NOTES

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
	let inputVal = search.value.toLowerCase();

	//console.log("Input evet fired", inputVal);
	let notecards = document.getElementsByClassName("notecard");
	Array.from(notecards).forEach(function (element) {
		let cardTxt = element.getElementsByTagName("p")[0].innerText;
		//console.log(cardTxt);
		if (cardTxt.includes(inputVal)) {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	});
});

//why convert it into string?
// when get pushed it becomes an array we have to convert it  into string because in local storage we have to set as string

//notes is like  an array which have many other string
//notesObj is an array of string
//now noteObj is a array of objects
