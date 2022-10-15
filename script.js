// get data on form submit
// store data in a global array
// create a display functiom to display all the data from array to our entry list

const taskList = [];
const badList = [];

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");
  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  console.log(taskList);
  displayTasks();
};

const displayTasks = () => {
  let str = "";

  taskList.map((item, i) => {
    console.log((item, i));
    str += `  <tr>
                                <th scope="row">1</th>
                                <td>${item.task}</td>
                                <td>${item.hr} hrs</td>
                                <td class="text-end">
                                    <button type="button" class="btn btn-danger btn-sm"><i
                                            class="fa-solid fa-trash"></i></button>
                                    <button type="button" class="btn btn-primary btn-sm"><i
                                            class="fa-solid fa-arrow-right"></i></button>
                                </td>
                            </tr> `;
  });
  document.getElementById("task-list").innerHTML = str;
};
