const currentMonth = document.querySelector("#month-date"),
  currentYear = document.querySelector("#year-date"),
  daysTag = document.querySelector(".days"),
  date_task = document.querySelector("#date-task"),
  prevNextMonth = document.querySelectorAll(".next-prev span");

// get current month and year
let date = new Date(),
  currYear = date.getFullYear(),
  dateLi,
  currMonth = date.getMonth(),
  title = document.getElementById("title-task"),
  category_task = document.querySelector("#category-task"),
  description = document.getElementById("description"),
  liElement,
  totalCompleted = 0,
  totalTodo = 0,
  totalTask = 0;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get day in each month
const renderCalendar = () => {
  //Get first day of month
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    // get last date of previous month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(),
    // get last day of month
    lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofLastMonth
    ).getDay(),
    //get last date of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let liTag = "";
  // create li of previous month last days
  for (let i = firstDayofMonth - 1; i >= 0; i--) {
    const currentDay = new Date(
      currYear,
      currMonth - 1,
      lastDateofLastMonth - i
    );
    const dayOfWeek = currentDay.getDay();
    if ((dayOfWeek !== 6) & (dayOfWeek !== 0)) {
      liTag += `
            <li class="inactive day">
            <div class="dayINMonth">${lastDateofLastMonth - i}</div>
            <p id="category"></p>
            <ul class="format-task">
              <p id="task"></p>
              <li id="description"></li>
            </ul>
            <label>
                <input class="tick-task" type="checkbox" name="done" value="Task" />
            </label>
            </li>`;
    }
  }
  //create li of al days of current month
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    const currentDay = new Date(currYear, currMonth, i);
    const dayOfWeek = currentDay.getDay();
    if (dayOfWeek !== 6 && dayOfWeek !== 0) {
      liTag += `
            <li id="${i}" class="${isToday} day" onclick = "showDetailTask(${i},this)">
              <div class="dayINMonth">${i}</div>
              <p id="category" contenteditable="true"></p>
                <ul class="format-task">
                <p id="task"></p>
                  <li id="description"></li>
                </ul>
              <label>
                <input class="tick-task"  type="checkbox" name="done" value="Task" />
              </label>
            </li>`;
    }
  }
  // create li of next month first days
  for (let i = 1; i <= 6 - lastDayofMonth; i++) {
    const currentDay = new Date(currYear, currMonth + 1, i);
    const dayOfWeek = currentDay.getDay();
    if (dayOfWeek !== 6 && dayOfWeek !== 0) {
      liTag += `
            <li class="inactive day">
            <div class="dayINMonth">${i}</div>
            <p id="category"></p>
            <ul class="format-task">
              <p id="task"></p>
              <li id="description"></li>
            </ul>
            <label>
                <input class="tick-task" type="checkbox" name="done" value="Task" />
            </label>
            </li>`;
    }
  }
  currentMonth.innerText = `${months[currMonth]}`;
  currentYear.innerText = `${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();

// Get next or previous month
prevNextMonth.forEach((icon) => {
  icon.addEventListener("click", () => {
    // clicked previous or next month then decrement current month by 1 else increment next month by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    renderCalendar();
  });
});

// Get date for category task
function formatDate(date) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Get date in date task with new task
function showAddNewTask() {
  var hiddenDiv = document.getElementById("detail-task");
  // Check display detail task
  if (hiddenDiv.style.display == "none" || hiddenDiv.style.display == "") {
    hiddenDiv.style.display = "block";
  } else {
    hiddenDiv.style.display = "none";
  }
}
// innerHTML to display detail task to add new task
document.getElementById("add-task").addEventListener("click", function (event) {
  event.preventDefault(); //block action by <a>
  // innerHTML to date-task in detail task
  document.getElementById("date-task").value = formatDate(date);
  document.getElementById("title-task").value = "";
  document.getElementById("description").value = "";
  showAddNewTask();
});

// Display task in detail task when click each day in calendar
function showDetailTask(day, element) {
  liElement = element;
  dateLi = day;
  document.getElementById("detail-task").style.display = "block";
  let category = element.querySelector("#category").innerText;
  let task = element.querySelector("#task").innerText;
  let checkbox = element.querySelector('input[type="checkbox"]');
  let descriptiontask = element.querySelector("#description").innerText;
  if (checkbox.checked) {
    category = "Completed";
  }
  let Month = currMonth < 10 ? "0" + currMonth : currMonth;
  let Day = day < 10 ? "0" + day : day;
  document.getElementById("date-task").value = `${currYear}-${
    Month + 1
  }-${Day}`;
  title.value = task;
  description.value = descriptiontask;
}

// Update task, description, category task when click to each day of calendar or btn add task
function updateTask() {
  //Take day in input detail task
  const dateIndex = document.getElementById("date-task").value;
  const inputdate = new Date(dateIndex);
  const dayofinput = inputdate.getDate();
  // Check day is selected
  if (liElement) {
    // Check day in input detail task and day is selected? if square -> CRUD with this day
    if (dayofinput == dateLi) {
      if (category_task) {
        liElement.querySelector("#category").innerHTML =
          category_task.innerHTML;
        if (category_task.innerHTML == "Completed"){
          liElement.querySelector(".tick-task").checked = true;
          totalCompleted++;
        }
      }
      liElement.querySelector("#task").innerHTML = title.value;
      liElement.querySelector("#description").innerHTML = description.value;
      colorTask(liElement);
      document.getElementById("detail-task").style.display = "none";
      liElement = null;
    } else {
      //else -> drag drop task to another day
      DragdropTaskToAnotherDay(dayofinput, liElement);
    }
  } else {
    // declare new task to calendar
    AddnewTask(dayofinput);
  }
  UpdateTotalTask();
}

function DragdropTaskToAnotherDay(dateIndex, liElement) {
  liElement.querySelector("#category").innerHTML = "";
  liElement.querySelector("#task").innerHTML = "";
  liElement.querySelector("#description").innerHTML = "";
  liElement.style.backgroundColor = "white";
  AddnewTask(dateIndex);
}

//Add new task
function AddnewTask(dateIndex) {
  let dateElement = document.getElementById(`${dateIndex}`);
  if (dateElement) {
    // If true -> add task to days
    let taskElement = dateElement.querySelector("#task");
    let descriptionElement = dateElement.querySelector("#description");
    taskElement.innerText = title.value;
    descriptionElement.innerText = description.value;
    if (category_task) {
      dateElement.querySelector("#category").innerHTML =
        category_task.innerHTML;
      if (category_task.innerHTML == "Completed"){
        dateElement.querySelector(".tick-task").checked = true;
        totalCompleted++;
      }
    }
    colorTask(dateElement);
    // when add done, display none to this tag detail task
    document.getElementById("detail-task").style.display = "none";
    totalTask++;
  } else {
    alert("There are no calendar dates that match the date you selected...");
  }
}

// Color instead of processing task
function colorTask(element) {
  if (
    category_task.innerHTML == "Completed" ||
    element.querySelector("#category").innerHTML == "Completed"
  ) {
    element.style.backgroundColor = "#f6c16a";
  } else if (
    category_task.innerHTML == "To do" ||
    element.querySelector("#category").innerHTML == "To do"
  ) {
    element.style.backgroundColor = "tomato";
  } else if (
    category_task.innerHTML == "Hold" ||
    element.querySelector("#category").innerHTML == "Hold"
  ) {
    element.style.backgroundColor = "red";
  } else {
    element.style.backgroundColor = "white";
  }
}
// Edit category task
document.getElementById("complete").addEventListener("click", function (event) {
  category_task.innerHTML = "Completed";
});

document.getElementById("todo").addEventListener("click", function (event) {
  category_task.innerHTML = "To do";
});

document.getElementById("hold").addEventListener("click", function (event) {
  category_task.innerHTML = "Hold";
});

// tick checkbox -> completed

// total task
// total task completed

const checkboxes = document.querySelectorAll(".tick-task");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    const parentLi = checkbox.closest("li");
    if (checkbox.checked) {
      parentLi.querySelector("#category").innerHTML = "Completed";
      colorTask(parentLi);
      totalCompleted++;
    } else {
      parentLi.querySelector("#category").innerHTML = "";
      colorTask(parentLi);
      totalCompleted--;
    }
    UpdateTotalTask();
  });
});
// percent task
document.getElementById("percent-progress").style.width = `${
  (totalCompleted / totalTask) * 100
}%`;
// total task to do

function UpdateTotalTask() {
  document.getElementById("total-completed-task").innerText = totalTask;
  document.getElementById("number-completed-task").innerText = totalCompleted;
  document.getElementById("number-to-do-task").innerText = totalTodo;
}

const categoryOfTask = document.querySelectorAll("#category");
categoryOfTask.forEach((category) => {
  category.addEventListener("input", (event) => {
    if (event.target.value== "Completed"){
      totalCompleted++;
    }
    else if (event.target.value == "To do") {
      totalTodo++;
    }
  });
  UpdateTotalTask();
});

// const targetElement = document.getElementById('myParagraph');

// // Tạo một đối tượng MutationObserver với callback function
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     // Xử lý sự kiện khi văn bản thay đổi
//     const totalText = mutation.target.innerText;
//     console.log('Văn bản đã thay đổi:', totalText);

//     // Tính tổng của văn bản và xử lý
//     const totalLength = totalText.length;
//     console.log('Tổng độ dài của văn bản:', totalLength);
//   });
// });

// // Cài đặt các tùy chọn cho MutationObserver
// const config = { childList: true, subtree: true, characterData: true };

// // Bắt đầu theo dõi sự thay đổi trên phần tử
// observer.observe(targetElement, config);

