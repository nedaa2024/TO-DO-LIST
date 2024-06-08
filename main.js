let task_name = document.getElementById("task_name");
let deadline = document.getElementById("deadline");
let updatebutton = document.getElementById("update");
let add = document.getElementById("add");
let task = document.getElementById("task");
let dat = document.getElementById("dat");
let inputsArr;
let val;

let state = "add";
let Th = document.getElementById("th");
let Thh = document.getElementById("thh");
if (localStorage.inputArr != null) {
  inputsArr = JSON.parse(localStorage.inputArr);
} else {
  inputsArr = [];
}

window.onload = function () {
  showINputsInTable();
  if (inputsArr.length > 0) {
    delall();
  }
};

add.onclick = function () {
  if (task_name.value != "" && deadline.value != "") {
    let obj = {
      checkState: false,
      task_name: task_name.value,
      deadline: deadline.value,
    };
    if (state === "add") {
      inputsArr.push(obj);
      task_name.style.border = "none";
      deadline.style.border = "none";
    } else {
      inputsArr[val] = obj;
      state = "add";
      add.innerHTML = "Add";
    }
    localStorage.setItem("inputArr", JSON.stringify(inputsArr));
    empty_inputs();
    showINputsInTable();
    delall();
  } else {
    if (task_name.value == "" && deadline.value != "") {
      var msg1 = document.getElementById("msg");
      msg1.innerHTML = " Enter The Task Name  !!";
      task_name.style.border = "red solid 1px";
    } else if (deadline.value == "" && task_name.value != "") {
      var msg12 = document.getElementById("msg2");
      msg12.innerHTML = " Enter The Date  !!";
      deadline.style.border = "red solid 1px";
    } else if (deadline.value == "" && task_name.value == "") {
      var msg1 = document.getElementById("msg");
      msg1.innerHTML = " Enter The Task Name  !!";
      task_name.style.border = "red solid 1px";
      var msg12 = document.getElementById("msg2");
      msg12.innerHTML = " Enter The Date  !!";
      deadline.style.border = "red solid 1px";
    }
  }
};

function empty_inputs() {
  task_name.value = "";
  deadline.value = "";
}

function showINputsInTable() {
  let inputTable = "";
  for (let i = 0; i < inputsArr.length; i++) {
    val = i;
    let completed_status = inputsArr[i].checkState;
    let checked = "";
    let coloor;
    let line;

    if (completed_status) {
      checked = "checked";

      line = "text-decoration:line-through";
    }

    inputTable += `
     <tr> 
     <td><input class="box" style="height:20px" class="box" id="${i}" type="checkbox" onchange="ch_status(${i},this)" ${checked}  > </td>
     <td id="td" style="${line}">   ${inputsArr[i].task_name}</td>
     <td         style="${line}">${inputsArr[i].deadline}</td>
    <td><img  onclick="updateinput(${i})" class ="update" src="./pen-to-square-regular.svg" alt=""></td>
    <td><img onclick="deleteItem(${i} )" class ="delete" src="./trash-can-regular.svg" alt=""></td>
    
   </tr>
   `;
  }

  document.getElementById("tbody").innerHTML = inputTable;
}

function deleteItem(i) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete this Task!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "The Task has been deleted.", "success");
    }
  });

  inputsArr.splice(i, 1);
  localStorage.inputArr = JSON.stringify(inputsArr);
  showINputsInTable();
}

function delall() {
  let deleteall = document.getElementById("deleteall");
  if (inputsArr.length > 0) {
    deleteall.innerHTML = `
<button class="delalll" onclick="deleteAll() ">Delete All</button>

`;
  }
}

function deleteAll() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete All!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "All files have been deleted.", "success");
    }
  });

  localStorage.clear();
  inputsArr.splice(0);
  console.log(inputsArr.splice(0));
  localStorage.clear();
  showINputsInTable();
  hidedelall();
  Th.innerHTML = "";
  Thh.innerHTML = "";
}

function hidedelall() {
  deleteall.innerHTML = "";
  showINputsInTable();
}

function updateinput(i) {
  task_name.value = inputsArr[i].task_name;
  deadline.value = inputsArr[i].deadline;
  add.innerHTML = "Update";
  state = "update";
  val = i;
}

function ch_status(i, t) {
  if (t.checked) {
    inputsArr[i].checkState = true;
    t.parentElement.nextElementSibling.style.textDecoration = "line-through";
    t.parentElement.nextElementSibling.nextElementSibling.style.textDecoration =
      "line-through";

    t.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].style.pointerEvents =
      "none";
  } else {
    inputsArr[i].checkState = false;
    t.parentElement.nextElementSibling.style.textDecoration = "none";
    t.parentElement.nextElementSibling.nextElementSibling.style.textDecoration =
      "none";
    t.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].style.pointerEvents =
      "auto";
  }
  localStorage.inputArr = JSON.stringify(inputsArr);
}
