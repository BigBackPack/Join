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
}


/** - GENERATING THE OVERLAY-CARD-DATA
 * This function generates and returns the html/css-data for the overlay-card.
 * @returns - retrun of generated html/css for the respective overlay
 */
function renderLiveOverlayCardToDo(tasks,i) {
  let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" type="checkbox" 
            
            onclick="updateBar('todo')">
            
            <span>${subtasks['text']}</span>
        </div>
    `;
  }).join('');

  tasks = taskList;

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');

  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <span title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</span>
                  </div>
                  <div class="ol-card-info">
                    <div class="ol-card-title"
                      >${tasks[i][1]['title']}</div
                    >
                    <br />
                    <br />
                    <div class="ol-card-sub">
                      <div class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</div
                      >
                    </div>
                    <br />
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <div class="ol-due-date-txt">${tasks[i][1]['dueDate']}</div>
                      </p>
                    </div>
                    <br />
                    <div class="ol-priority">
                      <p>
                        Priority:
                        <div class="ol-priority-txt">${tasks[i][1]['priority']}</div>
                        <div class="ol-priority-icon">
                          <svg
                            width="18"
                            height="8"
                            viewBox="0 0 18 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z"
                              fill="#FFA800"
                            />
                            <path
                              d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z"
                              fill="#FFA800"
                            />
                          </svg>
                        </span>
                      </p>
                    </div>
                    <br />
                    <div class="ol-assigned-container">
                      <p>
                        Assigned to:
                        <div class="ol-assigned-user">
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"   xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#1FD7C1" stroke="white"/>
                              <path d="M8.13303 20.1904V11.4632H13.4001V12.4007H9.18985V15.3495H13.1273V16.287H9.18985V19.2529H13.4683V20.1904H8.13303ZM15.3049 11.4632H16.5663L19.5322 18.7075H19.6345L22.6004 11.4632H23.8617V20.1904H22.8731V13.5597H22.7879L20.0606 20.1904H19.106L16.3788 13.5597H16.2935V20.1904H15.3049V11.4632Z" fill="white"/>
                            </svg>
                            <div class="ol-assigned-user-txt">${tasks[1]['assignment']}</div>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="15.5" fill="#462F8A" stroke="white"/>
                            <path d="M7.81662 11.4632H9.07799L12.0439 18.7075H12.1462L15.1121 11.4632H16.3734V20.1904H15.3848V13.5597H15.2996L12.5723 20.1904H11.6178L8.89049 13.5597H8.80526V20.1904H7.81662V11.4632ZM18.4924 20.1904V11.4632H21.5435C22.1515 11.4632 22.6529 11.5683 23.0478 11.7785C23.4427 11.9859 23.7367 12.2657 23.9299 12.618C24.1231 12.9674 24.2197 13.3552 24.2197 13.7813C24.2197 14.1563 24.1529 14.466 24.0194 14.7103C23.8887 14.9546 23.7154 15.1478 23.4995 15.2899C23.2864 15.4319 23.0549 15.537 22.8049 15.6052V15.6904C23.072 15.7075 23.3404 15.8012 23.6103 15.9717C23.8802 16.1421 24.106 16.3865 24.2879 16.7046C24.4697 17.0228 24.5606 17.412 24.5606 17.8722C24.5606 18.3097 24.4612 18.7032 24.2623 19.0526C24.0634 19.4021 23.7495 19.6791 23.3205 19.8836C22.8916 20.0882 22.3333 20.1904 21.6458 20.1904H18.4924ZM19.5492 19.2529H21.6458C22.3362 19.2529 22.8262 19.1194 23.116 18.8524C23.4086 18.5825 23.5549 18.2558 23.5549 17.8722C23.5549 17.5768 23.4796 17.3041 23.3291 17.0541C23.1785 16.8012 22.964 16.5995 22.6856 16.449C22.4072 16.2955 22.0776 16.2188 21.697 16.2188H19.5492V19.2529ZM19.5492 15.2984H21.5095C21.8276 15.2984 22.1146 15.2359 22.3702 15.1109C22.6288 14.9859 22.8333 14.8097 22.9839 14.5825C23.1373 14.3552 23.214 14.0882 23.214 13.7813C23.214 13.3978 23.0805 13.0725 22.8134 12.8055C22.5464 12.5356 22.1231 12.4007 21.5435 12.4007H19.5492V15.2984Z" fill="white"/>
                            </svg>
                            <div class="ol-assigned-user-txt">${tasks[1]['assignment']}</div>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                              <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
                              </svg>
                            <div class="ol-assigned-user-txt">${tasks[1]['assignment']}</div>
                          </div>
                            
                        </div>
                      </p>
                    </div>
                    <br />
                    <br />
                    <div class="ol-sub-tasks">
                      <div class="ol-sub-tasks-txt">Subtasks</div>
                      <div id='display-sub-task' class="ol-sub-tasks-container">

                        ${subtasksHtml}
                        
                      </div>
                      <br>
                      <div class="ol-crud">
                        <div class="ol-crud-edit-delete" onclick="delTaskInDb(${i})">
                          <img class='ol-crud-img' src="../img/png/overlay-delete.png" alt="Delete Icon">
                        </div>
                        <div class="ol-vertical"></div>
                        <div class="ol-crud-edit-delete" onclick="openTaskOverlay(${i}, 'crud')">
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
function renderLiveOverlayCardProgress(tasks,i) {
  let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" type="checkbox"  onclick="updateBar('progress')">
            <span>${subtasks['text']}</span>
        </div>
    `;
  }).join('');

  tasks = taskList;

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');

  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <span title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</span>
                  </div>
                  <div class="ol-card-info">
                    <span class="ol-card-title"
                      >${tasks[i][1]['title']}</span
                    >
                    <br />
                    <br />
                    <div class="ol-card-sub">
                      <span class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</span
                      >
                    </div>
                    <br />
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <span class="ol-due-date-txt">${tasks[i][1]['dueDate']}</span>
                      </p>
                    </div>
                    <br />
                    <div class="ol-priority">
                      <p>
                        Priority:
                        <span class="ol-priority-txt">${tasks[i][1]['priority']}</span>
                        <span class="ol-priority-icon">
                          <svg
                            width="18"
                            height="8"
                            viewBox="0 0 18 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z"
                              fill="#FFA800"
                            />
                            <path
                              d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z"
                              fill="#FFA800"
                            />
                          </svg>
                        </span>
                      </p>
                    </div>
                    <br />
                    <div class="ol-assigned-container">
                      <p>
                        Assigned to:
                        <div class="ol-assigned-user">
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"   xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#1FD7C1" stroke="white"/>
                              <path d="M8.13303 20.1904V11.4632H13.4001V12.4007H9.18985V15.3495H13.1273V16.287H9.18985V19.2529H13.4683V20.1904H8.13303ZM15.3049 11.4632H16.5663L19.5322 18.7075H19.6345L22.6004 11.4632H23.8617V20.1904H22.8731V13.5597H22.7879L20.0606 20.1904H19.106L16.3788 13.5597H16.2935V20.1904H15.3049V11.4632Z" fill="white"/>
                            </svg>
                            <span class="ol-assigned-user-txt">${tasks[1]['assignment']}</span>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="15.5" fill="#462F8A" stroke="white"/>
                            <path d="M7.81662 11.4632H9.07799L12.0439 18.7075H12.1462L15.1121 11.4632H16.3734V20.1904H15.3848V13.5597H15.2996L12.5723 20.1904H11.6178L8.89049 13.5597H8.80526V20.1904H7.81662V11.4632ZM18.4924 20.1904V11.4632H21.5435C22.1515 11.4632 22.6529 11.5683 23.0478 11.7785C23.4427 11.9859 23.7367 12.2657 23.9299 12.618C24.1231 12.9674 24.2197 13.3552 24.2197 13.7813C24.2197 14.1563 24.1529 14.466 24.0194 14.7103C23.8887 14.9546 23.7154 15.1478 23.4995 15.2899C23.2864 15.4319 23.0549 15.537 22.8049 15.6052V15.6904C23.072 15.7075 23.3404 15.8012 23.6103 15.9717C23.8802 16.1421 24.106 16.3865 24.2879 16.7046C24.4697 17.0228 24.5606 17.412 24.5606 17.8722C24.5606 18.3097 24.4612 18.7032 24.2623 19.0526C24.0634 19.4021 23.7495 19.6791 23.3205 19.8836C22.8916 20.0882 22.3333 20.1904 21.6458 20.1904H18.4924ZM19.5492 19.2529H21.6458C22.3362 19.2529 22.8262 19.1194 23.116 18.8524C23.4086 18.5825 23.5549 18.2558 23.5549 17.8722C23.5549 17.5768 23.4796 17.3041 23.3291 17.0541C23.1785 16.8012 22.964 16.5995 22.6856 16.449C22.4072 16.2955 22.0776 16.2188 21.697 16.2188H19.5492V19.2529ZM19.5492 15.2984H21.5095C21.8276 15.2984 22.1146 15.2359 22.3702 15.1109C22.6288 14.9859 22.8333 14.8097 22.9839 14.5825C23.1373 14.3552 23.214 14.0882 23.214 13.7813C23.214 13.3978 23.0805 13.0725 22.8134 12.8055C22.5464 12.5356 22.1231 12.4007 21.5435 12.4007H19.5492V15.2984Z" fill="white"/>
                            </svg>
                            <span class="ol-assigned-user-txt">${tasks[1]['assignment']}</span>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                              <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
                              </svg>
                            <span class="ol-assigned-user-txt">${tasks[1]['assignment']}</span>
                          </div>
                            
                        </div>
                      </p>
                    </div>
                    <br />
                    <br />
                    <div class="ol-sub-tasks">
                      <span class="ol-sub-tasks-txt">Subtasks</span>
                      <div id='display-sub-task' class="ol-sub-tasks-container">

                        ${subtasksHtml}
                        
                      </div>
                      <br>
                      <div class="ol-crud">
                        <div class="ol-crud-edit-delete" onclick="deleteThisSubOverlay()">
                          <img class='ol-crud-img' src="../img/png/overlay-delete.png" alt="Delete Icon"> 
                        </div>
                        <span class="ol-vertical"></span>
                        <div class="ol-crud-edit-delete" onclick="openTaskOverlay(${i}, 'crud')">
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
  let subtasksHtml = tasks[i][1]['subtasks'].map(subtasks => {
    return `
        <div class="ol-sub-task">
            <input class="ol-sub-task-checkbox" type="checkbox"  onclick="updateBar('done')">
            <span>${subtasks['text']}</span>
        </div>
    `;
  }).join('');

  let labelSrc = ((tasks[1].category == 'User Story') ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png');

  return `
    <div class="ol-board-card">
                <div class="ol-main-card">
                  <div class="ol-card-header">
                    <div class="ol-header-btn">
                      <img class="ol-label-img" src="${labelSrc}" alt="blue label - user stories">
                    </div>
                    <span title="close overlay" id="overlay-close-btn" class="ol-close-btn" onclick="closeOverlay()">X</span>
                  </div>
                  <div class="ol-card-info">
                    <span class="ol-card-title"
                      >${tasks[i][1]['title']}</span
                    >
                    <br />
                    <br />
                    <div class="ol-card-sub">
                      <span class="ol-card-sub-title"
                        >${tasks[i][1]['description']}</span
                      >
                    </div>
                    <br />
                    <div class="ol-due-date">
                      <p>
                        Due date:
                        <span class="ol-due-date-txt">${tasks[i][1]['dueDate']}</span>
                      </p>
                    </div>
                    <br />
                    <div class="ol-priority">
                      <p>
                        Priority:
                        <span class="ol-priority-txt">${tasks[i][1]['priority']}</span>
                        <span class="ol-priority-icon">
                          <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_44131_5787)">
                          <path d="M18.9041 14.7547C18.6695 14.7551 18.441 14.6803 18.2521 14.5412L10 8.458L1.74797 14.5412C1.63212 14.6267 1.50054 14.6887 1.36073 14.7234C1.22093 14.7582 1.07565 14.7651 0.933183 14.7437C0.790715 14.7223 0.653851 14.6732 0.530406 14.599C0.406961 14.5247 0.299352 14.427 0.213723 14.3112C0.128094 14.1954 0.0661217 14.0639 0.031345 13.9243C-0.00343163 13.7846 -0.0103318 13.6394 0.0110384 13.497C0.0541974 13.2095 0.209888 12.9509 0.44386 12.7781L9.34797 6.20761C9.53667 6.06802 9.76524 5.99268 10 5.99268C10.2348 5.99268 10.4634 6.06802 10.6521 6.20761L19.5562 12.7781C19.7421 12.915 19.88 13.1071 19.9501 13.327C20.0203 13.5469 20.0191 13.7833 19.9468 14.0025C19.8745 14.2216 19.7348 14.4124 19.5475 14.5475C19.3603 14.6826 19.1351 14.7551 18.9041 14.7547Z" fill="#FF3D00"/>
                          <path d="M18.9041 9.00568C18.6695 9.00609 18.441 8.93124 18.2521 8.79214L10 2.70898L1.74797 8.79214C1.514 8.96495 1.22091 9.0378 0.933188 8.99468C0.645461 8.95155 0.386663 8.79597 0.213727 8.56218C0.0407916 8.32838 -0.0321162 8.03551 0.0110429 7.74799C0.0542019 7.46048 0.209892 7.20187 0.443864 7.02906L9.34797 0.458588C9.53667 0.318997 9.76525 0.243652 10 0.243652C10.2348 0.243652 10.4634 0.318997 10.6521 0.458588L19.5562 7.02906C19.7421 7.16598 19.88 7.35809 19.9501 7.57797C20.0203 7.79785 20.0191 8.03426 19.9468 8.25344C19.8745 8.47262 19.7348 8.66338 19.5475 8.79847C19.3603 8.93356 19.1351 9.00608 18.9041 9.00568Z" fill="#FF3D00"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_44131_5787">
                          <rect width="20" height="14.5098" fill="white" transform="translate(0 0.245117)"/>
                          </clipPath>
                          </defs>
                          </svg>
                        </span>
                      </p>
                    </div>
                    <br />
                    <div class="ol-assigned-container">
                      <p>
                        Assigned to:
                        <div class="ol-assigned-user">
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"   xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#1FD7C1" stroke="white"/>
                              <path d="M8.13303 20.1904V11.4632H13.4001V12.4007H9.18985V15.3495H13.1273V16.287H9.18985V19.2529H13.4683V20.1904H8.13303ZM15.3049 11.4632H16.5663L19.5322 18.7075H19.6345L22.6004 11.4632H23.8617V20.1904H22.8731V13.5597H22.7879L20.0606 20.1904H19.106L16.3788 13.5597H16.2935V20.1904H15.3049V11.4632Z" fill="white"/>
                            </svg>
                            <span class="ol-assigned-user-txt">Emmanuel Mauer</span>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="15.5" fill="#462F8A" stroke="white"/>
                            <path d="M7.81662 11.4632H9.07799L12.0439 18.7075H12.1462L15.1121 11.4632H16.3734V20.1904H15.3848V13.5597H15.2996L12.5723 20.1904H11.6178L8.89049 13.5597H8.80526V20.1904H7.81662V11.4632ZM18.4924 20.1904V11.4632H21.5435C22.1515 11.4632 22.6529 11.5683 23.0478 11.7785C23.4427 11.9859 23.7367 12.2657 23.9299 12.618C24.1231 12.9674 24.2197 13.3552 24.2197 13.7813C24.2197 14.1563 24.1529 14.466 24.0194 14.7103C23.8887 14.9546 23.7154 15.1478 23.4995 15.2899C23.2864 15.4319 23.0549 15.537 22.8049 15.6052V15.6904C23.072 15.7075 23.3404 15.8012 23.6103 15.9717C23.8802 16.1421 24.106 16.3865 24.2879 16.7046C24.4697 17.0228 24.5606 17.412 24.5606 17.8722C24.5606 18.3097 24.4612 18.7032 24.2623 19.0526C24.0634 19.4021 23.7495 19.6791 23.3205 19.8836C22.8916 20.0882 22.3333 20.1904 21.6458 20.1904H18.4924ZM19.5492 19.2529H21.6458C22.3362 19.2529 22.8262 19.1194 23.116 18.8524C23.4086 18.5825 23.5549 18.2558 23.5549 17.8722C23.5549 17.5768 23.4796 17.3041 23.3291 17.0541C23.1785 16.8012 22.964 16.5995 22.6856 16.449C22.4072 16.2955 22.0776 16.2188 21.697 16.2188H19.5492V19.2529ZM19.5492 15.2984H21.5095C21.8276 15.2984 22.1146 15.2359 22.3702 15.1109C22.6288 14.9859 22.8333 14.8097 22.9839 14.5825C23.1373 14.3552 23.214 14.0882 23.214 13.7813C23.214 13.3978 23.0805 13.0725 22.8134 12.8055C22.5464 12.5356 22.1231 12.4007 21.5435 12.4007H19.5492V15.2984Z" fill="white"/>
                            </svg>
                            <span class="ol-assigned-user-txt">Marcel Bauer</span>
                          </div>
                          <div class="ol-user">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>
                              <path d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z" fill="white"/>
                              </svg>
                            <span class="ol-assigned-user-txt">Anton Mayer</span>
                          </div>
                            
                        </div>
                      </p>
                    </div>
                    <br />
                    <br />
                    <div class="ol-sub-tasks">
                      <span class="ol-sub-tasks-txt">Subtasks</span>
                      <div id='display-sub-task' class="ol-sub-tasks-container">

                        ${subtasksHtml}
                       
                      </div>
                      <br>
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