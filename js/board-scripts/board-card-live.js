/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveTodoCard(task, index) {
  let taskData = task[1];
  let subTaskAmount = taskData.subtasks.length;
  let labelSrc = taskData.category === 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';
  // Generiere HTML für zugewiesene Kontakte
  let assignedContactsHtml = getAssignedContactsHtml(taskData.assignment);
  return `
      <div draggable="true" id="todo-${index}" onclick="renderLiveOverlayCard('todo', taskList, ${index})" ondragstart="startDragging('todo-${index}')" class="board-card">
          <img class="label-img main-card" src="${labelSrc}" alt="user-story Icon" />
          <div class="card-info">
              <div class="card-title">${taskData.title}</div>
              
              <div class="card-sub-title">${taskData.description}</div>
              
              <div class="progress-container">
                  <div class="card-progress-bar">
                      <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="progress-bar-fill-to-${index}" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                      </svg>
                  </div>
                  <div class="bar-span"> 
                      <div class="subtask-checked-todo-${index}">0</div>
                      <span>/</span>
                      <div class="subtask-sum-todo">${subTaskAmount}</div>
                      Subtasks
                  </div>
              </div>
              <br />
              <div class="card-footer">
                  <div class="profile-badge-container">
                      ${assignedContactsHtml}
                  </div>
                  <div class="card-burger">
                      <img id="priority-icon" src="../img/png/prio-${taskData.priority}.png" />
                  </div>
              </div>
          </div>
      </div>`;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveProgressCard(task, index) {
  let taskData = task[1];
  let subTaskAmount = taskData.subtasks.length;
  let labelSrc = taskData.category === 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';
  // Generiere HTML für zugewiesene Kontakte
  let assignedContactsHtml = getAssignedContactsHtml(taskData.assignment);
  return `
      <div draggable="true" id="progress-${index}" 
        onclick="renderLiveOverlayCard('progress', taskList, ${index})" 
        ondragstart="startDragging('progress-${index}')" class="board-card">
          <img class="label-img main-card" src="${labelSrc}" alt="user-story Icon" />
          <div class="card-info">
              <div class="card-title">${taskData.title}</div>
              
              <div class="card-sub-title">${taskData.description}</div>
              
              <div class="progress-container">
                  <div class="card-progress-bar">
                      <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="progress-bar-fill-pr-${index}" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                      </svg>
                  </div>
                  <div class="bar-span"> 
                      <div class="subtask-checked-progress-${index}">0</div>
                      <span>/</span>
                      <div class="subtask-sum">${subTaskAmount}</div>
                      Subtasks
                  </div>
              </div>
              
              <div class="card-footer">
                  <div class="profile-badge-container">
                      ${assignedContactsHtml}
                  </div>
                  <div class="card-burger">
                      <img id="priority-icon" src="../img/png/prio-${taskData.priority}.png" />
                  </div>
              </div>
          </div>
      </div>`;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveFeedbackCard(task, index) {
  let taskData = task[1];
  let subTaskAmount = taskData.subtasks.length;
  let labelSrc = taskData.category === 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';
  // Generiere HTML für zugewiesene Kontakte
  let assignedContactsHtml = getAssignedContactsHtml(taskData.assignment);
  return `
      <div
          draggable="true"
          id="feedback-${index}"
          onclick="renderLiveOverlayCard('feedback', taskList, ${index})"
          ondragstart="startDragging('feedback-${index}')"
          class="board-card"
      >
          <img class="label-img main-card" src="${labelSrc}" alt="blue label - user stories">
          <div class="card-info">
              <div class="card-title">${taskData.title}</div>
              
              <div class="card-sub-title">${taskData.description}</div>
              
              <div class="card-footer">
                  <div class="profile-badge-container">
                      ${assignedContactsHtml}
                  </div>
                  <div class="card-burger">
                      <img id='priority-icon' src="../img/png/prio-${taskData.priority}.png" />
                  </div>
              </div>
          </div>
      </div>`;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveDoneCard(task, index) {
  let taskData = task[1];
  let subTaskAmount = taskData.subtasks.length;
  let labelSrc = taskData.category === 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';
  // Generiere HTML für zugewiesene Kontakte
  let assignedContactsHtml = getAssignedContactsHtml(taskData.assignment);
  return `
      <div
          draggable="true"
          id="done-${index}"
          onclick="renderLiveOverlayCard('done', taskList, ${index})"
          ondragstart="startDragging('done-${index}')"
          class="board-card"
      >
          <img class="label-img main-card" src="${labelSrc}" alt="blue label - user stories">
          <div class="card-info">
              <div class="card-title">${taskData.title}</div>
              
              <div class="card-sub-title">${taskData.description}</div>
             
              <div class="progress-container">
                  <div class="card-progress-bar">
                      <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="progress-bar-fill-do-${index}" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                      </svg>
                  </div>
                  <div class='bar-span'> 
                      <div class='subtask-checked-done-${index}'>0</div>
                      <span>/</span>
                      <div class='subtask-sum'>${subTaskAmount}</div>
                      Subtasks
                  </div>
              </div>
              
              <div class="card-footer">
                  <div class="profile-badge-container">
                      ${assignedContactsHtml}
                  </div>
                  <div class="card-burger">
                      <img id='priority-icon' src="../img/png/prio-${taskData.priority}.png" />
                  </div>
              </div>
          </div>
      </div>`;
}