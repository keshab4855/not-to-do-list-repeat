// get data on form submit
// store data in a global array
// create a display functiom to display all the data from array to our entry list

let taskList = [];
let badList = [];
const hrPerWeek = 24 * 7;
const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");
  const obj = {
    task,
    hr,
  };
  const totalAllocatedHrs = totalTaskHours();
  if (totalAllocatedHrs > hrPerWeek) {
    return alert("Sorry Boss, you dont have enough time to add the task ");
  }
  console.log(totalAllocatedHrs);
  taskList.push(obj);
  console.log(taskList);
  displayTasks();
  totalTaskHours();
};

const displayTasks = () => {
  let str = "";

  taskList.map((item, i) => {
    console.log((item, i));
    str += `  <tr>
                                <th scope="row">${i}</th>
                                <td>${item.task}</td>
                                <td>${item.hr} hrs</td>
                                <td class="text-end">
                                    <button onclick="deleteTask(${i})" type="button" class="btn btn-danger btn-sm"><i
                                            class="fa-solid fa-trash"></i></button>
                                    <button onclick="markAsNotToDo(${i})" type="button" class="btn btn-primary btn-sm"><i
                                            class="fa-solid fa-arrow-right"></i></button>
                                </td>
                            </tr> `;
  });
  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();
};

const displayBadTask = () => {
  let str = "";
  badList.map((item, i) => {
    str += `    <tr>
                                <th scope="row">${i + 1}</th>
                                <td>${item.task}</td>
                                <td>${item.hr} hrs</td>
                                <td class="text-end">
                                    <button onclick="markAsToDo(${i})" type="button" class="btn btn-warning btn-sm"><i
                                            class="fa-solid fa-arrow-left"></i></button>
                                    <button onclick="deleteBadTask(${i})" type="button" class="btn btn-danger btn-sm"><i
                                            class="fa-solid fa-trash"></i></button>

                                </td>
                            </tr>`;
  });
  document.getElementById("bad-task").innerHTML = str;
  totalBadTaskHours();
};
const totalTaskHours = () => {
  const total = taskList.reduce((subTtl, item) => {
    return subTtl + item.hr;
  }, 0);
  console.log(total);
  document.getElementById("totalHrs").innerText = total + totalBadTaskHours();
  return total;
};

const totalBadTaskHours = () => {
  const total = badList.reduce((subTtl, item) => {
    return subTtl + item.hr;
  }, 0);
  console.log(total);
  document.getElementById("totalBadHr").innerText = total;
  return total;
};

const deleteTask = (i) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }
  taskList = taskList.filter((item, index) => index !== i);
  displayTasks();
  totalTaskHours();
};
const deleteBadTask = (i) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }
  badList = badList.filter((item, index) => index !== i);
  displayBadTask();
  totalBadTaskHours();
  totalTaskHours();
};

const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1);
  badList.push(itm[0]);
  displayTasks();
  displayBadTask();
};

const markAsToDo = (i) => {
  const itm = badList.splice(i, 1);
  taskList.push(itm[0]);
  displayTasks();
  displayBadTask();
};
