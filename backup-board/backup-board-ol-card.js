/** - MAIN CONTROL LOADING THE OVERLAY FUNCTION
 * This function decides/loads the respective sub-function as per param.
 * @param {string} param - the respective category: progress, feedback, done 
 */
function renderLiveOverlayCard(param, tasks,i) {
  document.getElementById('overlay-card').classList.remove('d-none');
  const content = document.getElementById('overlay-card');
  content.innerHTML = '';

  if (param == 'progress') {
    content.innerHTML = renderLiveOverlayCardProgress(tasks,i);
  } else if (param == 'done') {
    content.innerHTML = renderLiveOverlayCardDone(tasks,i);
  } else if (param == 'todo') {
    content.innerHTML = renderLiveOverlayCardToDo(tasks,i);
  }
  content.classList.add('show-full-name');
}


/** - GENERATING THE OVERLAY-CARD-DATA
 * This function generates and returns the html/css-data for the overlay-card.
 * @returns - retrun of generated html/css for the respective overlay
 */
function renderLiveOverlayCardToDo(tasks,i) {
  let todoTasks = taskList.filter(t=> t[1]['board'] == 'todo');
  tasks = todoTasks;

  //console.log('start - renderLiverOverlayTodo: ',tasks);
  let subTaskId = tasks[i][1]['subtasks'];
  //console.log('subTaskId: ',subTaskId);
  // let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
  let subtasksHtml = todoTasks[i][1]['subtasks'].map((subtasks, subIndex) => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" type="checkbox" 
            
            onclick="updateBar('todo', this, ${i}, ${subIndex})">
            
            <div>${subtasks['text']}</div>
        </div>
    `;
  }).join('');

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');
  let assignedContactsHtml = getAssignedContactsHtml(tasks[i][1]['assignment']);


  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <div title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</div>
                  </div>
                  <div class="ol-card-info">
                    <div class="ol-card-title"
                      >${tasks[i][1]['title']}</div
                    >
                    
                    <div class="ol-card-sub">
                      <div class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</div
                      >
                    </div>
                    
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <div class="ol-due-date-txt">${tasks[i][1]['dueDate']}</div>
                      </p>
                    </div>
                    
                       <div class="ol-priority">
                      <p>
                        Priority:
                        <div class="ol-priority-txt">${tasks[i][1]['priority']}</div>
                        <div class="ol-priority-icon">
                          <img src="../../img/png/prio-${tasks[i][1]['priority']}.png" alt="">
                        </div>
                      </p>
                    </div>
                    
                    <div class="ol-assigned-container">
                        <p>Assigned to: <div class="ol-assigned-user">${assignedContactsHtml}</div></p>
                    </div>

                    <div class="ol-sub-tasks">
                      <div class="ol-sub-tasks-txt">Subtasks</div>
                      <div id='display-sub-task' class="ol-sub-tasks-container">
                        ${subtasksHtml}       
                      </div>
                    </div>   
                    
                    <div class="ol-crud">
                      <div class="ol-crud-edit-delete" onclick="delTaskInDb(${i})">
                        <img class='ol-crud-img' src="../img/png/overlay-delete.png" alt="Delete Icon">
                      </div>
                      <div class="ol-vertical"></div>
                      <div class="ol-crud-edit-delete" onclick="openAndFillTaskOverlay(${escapeTaskData(tasks[i][1])}, true)">
                        <img class='ol-crud-img' src="../img/png/overlay-edit.png" alt="Edit Icon">
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
    `;
}


/** - GENERATING THE OVERLAY-CARD-DATA
 * This function generates and returns the html/css-data for the overlay-card.
 * @returns - retrun of generated html/css for the respective overlay
 */
function renderLiveOverlayCardProgress(tasks,i) {
  let progressTasks = taskList.filter(t=> t[1]['board'] == 'progress');
  tasks = progressTasks;

  // let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
  let subtasksHtml = progressTasks[i][1]['subtasks'].map((subtasks, subIndex) => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" 
            type="checkbox"  
            onclick="updateBar('progress', this, ${i}, ${subIndex})">
            <div>${subtasks['text']}</div>
        </div>
    `;
  }).join('');

  

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');
  let assignedContactsHtml = getAssignedContactsHtml(tasks[i][1]['assignment']);

  // Update the overlay HTML with the generated subtasks HTML
  //document.getElementById('display-sub-task').textContent = subtasksHtml;

  // Initialize the subtask count
  //updateSubTaskCount();
  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <div title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</div>
                  </div>
                  <div class="ol-card-info">
                    <span class="ol-card-title"
                      >${tasks[i][1]['title']}</span>
                    
                    <div class="ol-card-sub">
                      <span class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</span>
                    </div>
                    
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <span class="ol-due-date-txt">${tasks[i][1]['dueDate']}</span>
                      </p>
                    </div>
                  
                    <div class="ol-priority">
                      <p>
                        Priority:
                        <span class="ol-priority-txt">${tasks[i][1]['priority']}</span>
                        <span class="ol-priority-icon">
                          <img src="../../img/png/prio-${tasks[i][1]['priority']}.png" alt="">
                        </span>
                      </p>
                    </div>

                    <div class="ol-assigned-container">
                        <p>Assigned to: <div class="ol-assigned-user">${assignedContactsHtml}</div></p>
                    </div>

                    <div class="ol-sub-tasks">
                      <span class="ol-sub-tasks-txt">Subtasks</span>
                      <div id='display-sub-task' class="ol-sub-tasks-container">

                        ${subtasksHtml}
                        
                      </div>
                      
                      <div class="ol-crud">
                        <div class="ol-crud-edit-delete" onclick="deleteThisSubOverlay()">
                          <img class='ol-crud-img' src="../img/png/overlay-delete.png" alt="Delete Icon"> 
                        </div>
                        <span class="ol-vertical"></span>
                        <div class="ol-crud-edit-delete" onclick="openAndFillTaskOverlay(${escapeTaskData(tasks[i][1])}, true)">
                          <img class='ol-crud-img' src="../img/png/overlay-edit.png" alt="Edit Icon">
                        </div>                          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `;
}



/** - GENERATING THE OVERLAY-CARD-DATA
 * This function generates and returns the html/css-data for the overlay-card.
 * @returns - retrun of generated html/css for the respective overlay
 */
function renderLiveOverlayCardDone(tasks,i) {
  let doneTasks = taskList.filter(t=> t[1]['board'] == 'done');
  tasks = doneTasks;

  console.log('ol-done - subtasks: ',tasks[i][1]['subtasks']);
  // let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
  let subtasksHtml = doneTasks[i][1]['subtasks'].map((subtasks, subIndex) => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" 
            type="checkbox"  
            onclick="updateBar('done', this, ${i}, ${subIndex})">
            <div>${subtasks['text']}</div>
        </div>
    `;
  }).join('');

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');
  let assignedContactsHtml = getAssignedContactsHtml(tasks[i][1]['assignment']);
  

  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <div title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</div>
                  </div>
                  <div class="ol-card-info">
                    <span class="ol-card-title"
                      >${tasks[i][1]['title']}</span>
                    
                    <div class="ol-card-sub">
                      <span class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</span >
                    </div>
                    
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <span class="ol-due-date-txt">${tasks[i][1]['dueDate']}</span>
                      </p>
                    </div>
                   
                    <div class="ol-priority">
                      <p>
                        Priority:
                        <span class="ol-priority-txt">${tasks[i][1]['priority']}</span>
                        <div class="ol-priority-icon">
                          <img src="../../img/png/prio-${tasks[i][1]['priority']}.png" alt="">
                        </div>
                      </p>
                    </div>

                    <div class="ol-assigned-container">
                        <p>Assigned to: <div class="ol-assigned-user">${assignedContactsHtml}</div></p>
                    </div>

                    <div class="ol-sub-tasks">
                      <span class="ol-sub-tasks-txt">Subtasks</span>
                      <div id='display-sub-task' class="ol-sub-tasks-container">

                        ${subtasksHtml}
                       
                      </div>
                      
                      <div class="ol-crud">
                        <div>
                          <img class='ol-crud-img' src="../img/png/overlay-delete.png" alt="Delete Icon">
                        </div>
                        <span class="ol-vertical"></span>
                        <div>
                          <img class='ol-crud-img' src="../img/png/overlay-edit.png" alt="Edit Icon">
                        </div>
                          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `;
}

/** - CLOSE OVERLAY -
 * This function is used to close the overlay once the X in the upper right corner of the overlay * is clicked.
 */
function closeOverlay() {
  document.getElementById('overlay-card').classList.add('d-none');
  const content = document.getElementById('overlay-card');
  content.innerHTML = '';
}

/**
 * This function shows the full name of the user in the header.
 */
function showProfileBadgeName(){
  document.getElementById('fullName').style.display = 'unset';
}