/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveTodoCard(task, i) {
  let SubTaskAmount = task[1]['subtasks'].length;
  // console.log('task[i] from renderTodo(): ',task);
  // console.log('renderTodo() - subtasks: ',task[1]['subtasks']);
  let labelSrc = task[1]['category'] == 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';

  return `<div
                  draggable="true"
                  id="todo-${i}"
                  onclick="renderLiveOverlayCard('todo', taskList, ${i})"
                  ondragstart="startDragging(${i})"
                  class="board-card"
                >
                  <img class='label-img main-card' src="${labelSrc}" alt="user-stoy Icon" />
                  <div class="card-info">
                    <div class="card-title"
                      >${task[1]['title']}</div
                    >
                    <br />
                    <br />
                    <div class="card-sub-title"
                      >${task[1]['description']}</div
                    >
                    <br />
                    <br />
                    <div class="progress-container">
                      <div class="card-progress-bar">
                        <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://   www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="progress-bar-fill-to" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                        </svg>
                      </div>
                      <div class='bar-span'> 
                        <span class='subtask-checked'>X</span>
                        <span>/</span>
                        <span class='subtask-sum'>${SubTaskAmount}</span>
                        Subtasks
                      </div>
                    </div>
                    <br />
                    <div class="card-footer">
                      <div class="profile-badge">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#FF7A00"
                            stroke="white"
                          />
                          <path
                            d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z"
                            fill="white"
                          />
                        </svg>
                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#1FD7C1"
                            stroke="white"
                          />
                          <path
                            d="M8.13303 20.1904V11.4632H13.4001V12.4007H9.18985V15.3495H13.1273V16.287H9.18985V19.2529H13.4683V20.1904H8.13303ZM15.3049 11.4632H16.5663L19.5322 18.7075H19.6345L22.6004 11.4632H23.8617V20.1904H22.8731V13.5597H22.7879L20.0606 20.1904H19.106L16.3788 13.5597H16.2935V20.1904H15.3049V11.4632Z"
                            fill="white"
                          />
                        </svg>
                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#462F8A"
                            stroke="white"
                          />
                          <path
                            d="M7.81662 11.4632H9.07799L12.0439 18.7075H12.1462L15.1121 11.4632H16.3734V20.1904H15.3848V13.5597H15.2996L12.5723 20.1904H11.6178L8.89049 13.5597H8.80526V20.1904H7.81662V11.4632ZM18.4924 20.1904V11.4632H21.5435C22.1515 11.4632 22.6529 11.5683 23.0478 11.7785C23.4427 11.9859 23.7367 12.2657 23.9299 12.618C24.1231 12.9674 24.2197 13.3552 24.2197 13.7813C24.2197 14.1563 24.1529 14.466 24.0194 14.7103C23.8887 14.9546 23.7154 15.1478 23.4995 15.2899C23.2864 15.4319 23.0549 15.537 22.8049 15.6052V15.6904C23.072 15.7075 23.3404 15.8012 23.6103 15.9717C23.8802 16.1421 24.106 16.3865 24.2879 16.7046C24.4697 17.0228 24.5606 17.412 24.5606 17.8722C24.5606 18.3097 24.4612 18.7032 24.2623 19.0526C24.0634 19.4021 23.7495 19.6791 23.3205 19.8836C22.8916 20.0882 22.3333 20.1904 21.6458 20.1904H18.4924ZM19.5492 19.2529H21.6458C22.3362 19.2529 22.8262 19.1194 23.116 18.8524C23.4086 18.5825 23.5549 18.2558 23.5549 17.8722C23.5549 17.5768 23.4796 17.3041 23.3291 17.0541C23.1785 16.8012 22.964 16.5995 22.6856 16.449C22.4072 16.2955 22.0776 16.2188 21.697 16.2188H19.5492V19.2529ZM19.5492 15.2984H21.5095C21.8276 15.2984 22.1146 15.2359 22.3702 15.1109C22.6288 14.9859 22.8333 14.8097 22.9839 14.5825C23.1373 14.3552 23.214 14.0882 23.214 13.7813C23.214 13.3978 23.0805 13.0725 22.8134 12.8055C22.5464 12.5356 22.1231 12.4007 21.5435 12.4007H19.5492V15.2984Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div class="card-burger">
                        <img id='priority-icon' src="../img/png/prio-${task[1]['priority']}.png" />
                      </div>
                    </div>
                  </div>
                  
  </div>`;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveProgressCard(task, i) {
  let SubTaskAmount = task[1]['subtasks'].length;
  // console.log('task[i] from renderProgress(): ',task);
  // console.log('renderProgress() - subtasks: ',task[1]['subtasks']);
  let labelSrc = task[1]['category'] == 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';
  return `<div
                  draggable="true"
                  id="progress-${i}"
                  onclick="renderLiveOverlayCard('progress', taskList, ${i})"
                  ondragstart="startDragging(${i})"
                  class="board-card"
                >
                  <img class="label-img main-card" src="${labelSrc}" alt="blue label - user stories">
                  <div class="card-info">
                    <div class="card-title"
                      >${task[1]['title']}</div
                    >
                    <br />
                    <br />
                    <div class="card-sub-title"
                      >${task[1]['description']}</div
                    >
                    <br />
                    <br />
                    <div class="progress-container">
                      <div class="card-progress-bar">
                        <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://   www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="progress-bar-fill-pr" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                        </svg>
                      </div>
                      <div class='bar-span'> 
                        <span class='subtask-checked'>0</span>
                        <span>/</span>
                        <span class='subtask-sum'>${SubTaskAmount}</span>
                        Subtasks
                      </div>
                    </div>
                    <br />
                    <div class="card-footer">
                      <div class="profile-badge">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#FF7A00"
                            stroke="white"
                          />
                          <path
                            d="M8.02224 20.1904H6.91428L10.1188 11.4632H11.2097L14.4143 20.1904H13.3063L10.6984 12.8438H10.6302L8.02224 20.1904ZM8.43133 16.7813H12.8972V17.7188H8.43133V16.7813ZM15.7737 11.4632H17.035L20.0009 18.7075H20.1032L23.0691 11.4632H24.3305V20.1904H23.3418V13.5597H23.2566L20.5293 20.1904H19.5748L16.8475 13.5597H16.7623V20.1904H15.7737V11.4632Z"
                            fill="white"
                          />
                        </svg>
                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#1FD7C1"
                            stroke="white"
                          />
                          <path
                            d="M8.13303 20.1904V11.4632H13.4001V12.4007H9.18985V15.3495H13.1273V16.287H9.18985V19.2529H13.4683V20.1904H8.13303ZM15.3049 11.4632H16.5663L19.5322 18.7075H19.6345L22.6004 11.4632H23.8617V20.1904H22.8731V13.5597H22.7879L20.0606 20.1904H19.106L16.3788 13.5597H16.2935V20.1904H15.3049V11.4632Z"
                            fill="white"
                          />
                        </svg>
                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#462F8A"
                            stroke="white"
                          />
                          <path
                            d="M7.81662 11.4632H9.07799L12.0439 18.7075H12.1462L15.1121 11.4632H16.3734V20.1904H15.3848V13.5597H15.2996L12.5723 20.1904H11.6178L8.89049 13.5597H8.80526V20.1904H7.81662V11.4632ZM18.4924 20.1904V11.4632H21.5435C22.1515 11.4632 22.6529 11.5683 23.0478 11.7785C23.4427 11.9859 23.7367 12.2657 23.9299 12.618C24.1231 12.9674 24.2197 13.3552 24.2197 13.7813C24.2197 14.1563 24.1529 14.466 24.0194 14.7103C23.8887 14.9546 23.7154 15.1478 23.4995 15.2899C23.2864 15.4319 23.0549 15.537 22.8049 15.6052V15.6904C23.072 15.7075 23.3404 15.8012 23.6103 15.9717C23.8802 16.1421 24.106 16.3865 24.2879 16.7046C24.4697 17.0228 24.5606 17.412 24.5606 17.8722C24.5606 18.3097 24.4612 18.7032 24.2623 19.0526C24.0634 19.4021 23.7495 19.6791 23.3205 19.8836C22.8916 20.0882 22.3333 20.1904 21.6458 20.1904H18.4924ZM19.5492 19.2529H21.6458C22.3362 19.2529 22.8262 19.1194 23.116 18.8524C23.4086 18.5825 23.5549 18.2558 23.5549 17.8722C23.5549 17.5768 23.4796 17.3041 23.3291 17.0541C23.1785 16.8012 22.964 16.5995 22.6856 16.449C22.4072 16.2955 22.0776 16.2188 21.697 16.2188H19.5492V19.2529ZM19.5492 15.2984H21.5095C21.8276 15.2984 22.1146 15.2359 22.3702 15.1109C22.6288 14.9859 22.8333 14.8097 22.9839 14.5825C23.1373 14.3552 23.214 14.0882 23.214 13.7813C23.214 13.3978 23.0805 13.0725 22.8134 12.8055C22.5464 12.5356 22.1231 12.4007 21.5435 12.4007H19.5492V15.2984Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div class="card-burger">
                        <img id='priority-icon' src="../img/png/prio-${task[1]['priority']}.png" />
                      </div>
                    </div>
                  </div>
  </div>`;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveFeedbackCard(task,i) {
  let SubTaskAmount = task[1]['subtasks'].length;
  // console.log('task[i] from renderFeedback(): ',task);
  // console.log('renderFeedback() - subtasks: ',task[1]['subtasks']);
  let labelSrc = task[1]['category'] == 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png'; 

  return `
    <div draggable="true" class="board-card small-card" onclick="renderLiveOverlayCard('feedback', taskList, ${i})" ondragstart="startDragging(${i})">
                <div class="main-card">
                  <img class="label-img" src="${labelSrc}" alt="blue label - user stories">
                  <div class="card-info">
                    <div class="card-title"
                      >${task[1]['title']}</div
                    >
                    <br />
                    <br />
                    <div class="card-sub-title"
                      >${task[1]['description']}</div
                    >
                    <br />
                    <br />

                    <br />
                    <div class="card-footer">
                      <div class="profile-badge">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#FC71FF"
                            stroke="white"
                          />
                          <path
                            d="M11.8515 20.1904H9.1583V11.4632H11.9708C12.8174 11.4632 13.5418 11.6379 14.1441 11.9873C14.7464 12.3339 15.208 12.8325 15.529 13.483C15.8501 14.1308 16.0106 14.9063 16.0106 15.8097C16.0106 16.7188 15.8486 17.5015 15.5248 18.1578C15.2009 18.8112 14.7293 19.314 14.11 19.6663C13.4907 20.0157 12.7378 20.1904 11.8515 20.1904ZM10.2151 19.2529H11.7833C12.5049 19.2529 13.1029 19.1137 13.5773 18.8353C14.0518 18.5569 14.4055 18.1606 14.6384 17.6464C14.8714 17.1322 14.9878 16.52 14.9878 15.8097C14.9878 15.1052 14.8728 14.4987 14.6427 13.9901C14.4126 13.4788 14.0688 13.0867 13.6114 12.814C13.154 12.5384 12.5844 12.4007 11.9026 12.4007H10.2151V19.2529ZM17.7833 20.1904V11.4632H23.0503V12.4007H18.8401V15.3495H22.7776V16.287H18.8401V19.2529H23.1185V20.1904H17.7833Z"
                            fill="white"
                          />
                        </svg>

                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#6E52FF"
                            stroke="white"
                          />
                          <path
                            d="M9.40439 20.1904V11.4632H12.4555C13.0635 11.4632 13.5649 11.5683 13.9598 11.7785C14.3547 11.9859 14.6487 12.2657 14.8419 12.618C15.0351 12.9674 15.1317 13.3552 15.1317 13.7813C15.1317 14.1563 15.0649 14.466 14.9314 14.7103C14.8007 14.9546 14.6274 15.1478 14.4115 15.2899C14.1984 15.4319 13.9669 15.537 13.7169 15.6052V15.6904C13.9839 15.7075 14.2524 15.8012 14.5223 15.9717C14.7922 16.1421 15.018 16.3865 15.1998 16.7046C15.3817 17.0228 15.4726 17.412 15.4726 17.8722C15.4726 18.3097 15.3731 18.7032 15.1743 19.0526C14.9754 19.4021 14.6615 19.6791 14.2325 19.8836C13.8035 20.0882 13.2453 20.1904 12.5578 20.1904H9.40439ZM10.4612 19.2529H12.5578C13.2481 19.2529 13.7382 19.1194 14.028 18.8524C14.3206 18.5825 14.4669 18.2558 14.4669 17.8722C14.4669 17.5768 14.3916 17.3041 14.241 17.0541C14.0905 16.8012 13.876 16.5995 13.5976 16.449C13.3192 16.2955 12.9896 16.2188 12.6089 16.2188H10.4612V19.2529ZM10.4612 15.2984H12.4214C12.7396 15.2984 13.0266 15.2359 13.2822 15.1109C13.5408 14.9859 13.7453 14.8097 13.8959 14.5825C14.0493 14.3552 14.126 14.0882 14.126 13.7813C14.126 13.3978 13.9925 13.0725 13.7254 12.8055C13.4584 12.5356 13.0351 12.4007 12.4555 12.4007H10.4612V15.2984ZM16.9193 20.1904V19.4234L21.6239 12.4007H16.8682V11.4632H22.8852V12.2302L18.1807 19.2529H22.9364V20.1904H16.9193Z"
                            fill="white"
                          />
                        </svg>

                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#9327FF"
                            stroke="white"
                          />
                          <path
                            d="M9.53383 20.1904H8.42588L11.6304 11.4632H12.7213L15.9259 20.1904H14.8179L12.21 12.8438H12.1418L9.53383 20.1904ZM9.94292 16.7813H14.4088V17.7188H9.94292V16.7813ZM22.058 13.645C22.0068 13.2132 21.7995 12.8779 21.4358 12.6393C21.0722 12.4007 20.6262 12.2813 20.0978 12.2813C19.7114 12.2813 19.3733 12.3438 19.0835 12.4688C18.7966 12.5938 18.5722 12.7657 18.4103 12.9845C18.2512 13.2032 18.1716 13.4518 18.1716 13.7302C18.1716 13.9632 18.227 14.1634 18.3378 14.3311C18.4514 14.4958 18.5963 14.6336 18.7725 14.7444C18.9486 14.8524 19.1333 14.9418 19.3264 15.0129C19.5196 15.0811 19.6972 15.1365 19.8591 15.1791L20.7455 15.4177C20.9728 15.4774 21.2256 15.5597 21.504 15.6649C21.7853 15.77 22.0537 15.9134 22.3094 16.0953C22.5679 16.2742 22.781 16.5043 22.9486 16.7856C23.1162 17.0669 23.2 17.412 23.2 17.8211C23.2 18.2927 23.0764 18.7188 22.8293 19.0995C22.585 19.4802 22.227 19.7828 21.7554 20.0072C21.2867 20.2316 20.7171 20.3438 20.0466 20.3438C19.4216 20.3438 18.8804 20.243 18.423 20.0413C17.9685 19.8396 17.6105 19.5583 17.3492 19.1975C17.0907 18.8367 16.9443 18.4177 16.9103 17.9404H18.0012C18.0296 18.27 18.1404 18.5427 18.3335 18.7586C18.5296 18.9717 18.7767 19.1308 19.075 19.2359C19.3762 19.3382 19.7 19.3893 20.0466 19.3893C20.45 19.3893 20.8122 19.324 21.1333 19.1933C21.4543 19.0597 21.7085 18.8751 21.896 18.6393C22.0835 18.4007 22.1773 18.1222 22.1773 17.8041C22.1773 17.5143 22.0963 17.2785 21.9344 17.0967C21.7725 16.9149 21.5594 16.7671 21.2952 16.6535C21.031 16.5399 20.7455 16.4404 20.4387 16.3552L19.3648 16.0484C18.683 15.8524 18.1432 15.5725 17.7455 15.2089C17.3478 14.8453 17.1489 14.3694 17.1489 13.7813C17.1489 13.2927 17.281 12.8666 17.5452 12.5029C17.8122 12.1365 18.1702 11.8524 18.6191 11.6507C19.0708 11.4461 19.575 11.3438 20.1318 11.3438C20.6943 11.3438 21.1943 11.4447 21.6318 11.6464C22.0693 11.8453 22.4159 12.118 22.6716 12.4646C22.9301 12.8112 23.0665 13.2046 23.0807 13.645H22.058Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div class="card-burger">
                        <img id='priority-icon' src="../img/png/prio-${task[1]['priority']}.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `;
}


/** - RETURN FUNCTION TO GENERATE HTML -
 * This function returns the html/css for a card.
 * @returns - the generated HTML/Css structure for set function.
 */
function renderLiveDoneCard(task,i) {
  // console.log('renderDone() - title: ',task[1]['title']);

  // console.log('renderDone() - subtasks: ',task[1]['subtasks']);
  let SubTaskAmount = task[1]['subtasks'].length;
  // console.log('renderDone() - subtasks QTY: ',SubTaskAmount);
  let labelSrc = task[1]['category'] == 'User Story' ? '../img/png/label-user-story-blue.png' : '../img/png/label-techn-task-green.png';

  return `
  <div
                  draggable="true"
                  id="done-${i}"
                  onclick="renderLiveOverlayCard('done', taskList, ${i})"
                  ondragstart="startDragging(${i})"
                  class="board-card"
                >
                  <img class="label-img main-card" src="${labelSrc}" alt="blue label - user stories">
                  <div class="card-info">
                    <div class="card-title">${task[1]['title']}</div>
                    <br />
                    <br />
                    <div class="card-sub-title"
                      >${task[1]['description']}</div
                    >
                    <br />
                    <br />
                    <div class="progress-container">
                      <div class="card-progress-bar">
                        <svg width="118" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://   www.w3.org/2000/svg" class="progress-bar">
                          <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
                          <rect id="done-bar-fill-do" width="0" height="8" rx="4" fill="#4589FF"/>
                          <rect x="0.5" y="0.5" width="127" height="7" rx="3.5" stroke="black"/>
                        </svg>
                      </div>
                      <div class='bar-span'> 
                        <span class='subtask-checked'>0</span>
                        <span>/</span>
                        <span class='subtask-sum'>${SubTaskAmount}</span>
                        Subtasks
                      </div>
                    </div>
                    <br />
                    <br />
                    <div class="card-footer">
                      <div class="profile-badge">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#00BEE8"
                            stroke="white"
                          />
                          <path
                            d="M12.6654 13.645C12.6143 13.2132 12.4069 12.8779 12.0432 12.6393C11.6796 12.4007 11.2336 12.2813 10.7052 12.2813C10.3188 12.2813 9.98074 12.3438 9.69097 12.4688C9.40404 12.5938 9.17961 12.7657 9.01767 12.9845C8.85858 13.2032 8.77904 13.4518 8.77904 13.7302C8.77904 13.9632 8.83444 14.1634 8.94523 14.3311C9.05887 14.4958 9.20375 14.6336 9.37989 14.7444C9.55603 14.8524 9.74069 14.9418 9.93387 15.0129C10.127 15.0811 10.3046 15.1365 10.4665 15.1791L11.3529 15.4177C11.5802 15.4774 11.833 15.5597 12.1114 15.6649C12.3927 15.77 12.6611 15.9134 12.9168 16.0953C13.1753 16.2742 13.3884 16.5043 13.556 16.7856C13.7236 17.0669 13.8074 17.412 13.8074 17.8211C13.8074 18.2927 13.6839 18.7188 13.4367 19.0995C13.1924 19.4802 12.8344 19.7828 12.3628 20.0072C11.8941 20.2316 11.3245 20.3438 10.654 20.3438C10.029 20.3438 9.48785 20.243 9.03046 20.0413C8.57591 19.8396 8.21796 19.5583 7.9566 19.1975C7.69807 18.8367 7.55177 18.4177 7.51767 17.9404H8.60858C8.63699 18.27 8.74779 18.5427 8.94097 18.7586C9.13699 18.9717 9.38415 19.1308 9.68245 19.2359C9.98358 19.3382 10.3074 19.3893 10.654 19.3893C11.0574 19.3893 11.4197 19.324 11.7407 19.1933C12.0617 19.0597 12.316 18.8751 12.5035 18.6393C12.691 18.4007 12.7847 18.1222 12.7847 17.8041C12.7847 17.5143 12.7038 17.2785 12.5418 17.0967C12.3799 16.9149 12.1668 16.7671 11.9026 16.6535C11.6384 16.5399 11.3529 16.4404 11.0461 16.3552L9.97222 16.0484C9.2904 15.8524 8.75063 15.5725 8.3529 15.2089C7.95517 14.8453 7.75631 14.3694 7.75631 13.7813C7.75631 13.2927 7.88841 12.8666 8.15262 12.5029C8.41966 12.1365 8.77762 11.8524 9.22648 11.6507C9.67819 11.4461 10.1824 11.3438 10.7393 11.3438C11.3018 11.3438 11.8018 11.4447 12.2393 11.6464C12.6768 11.8453 13.0234 12.118 13.279 12.4646C13.5376 12.8112 13.6739 13.2046 13.6881 13.645H12.6654ZM15.545 11.4632H16.8064L19.7723 18.7075H19.8746L22.8405 11.4632H24.1018V20.1904H23.1132V13.5597H23.028L20.3007 20.1904H19.3462L16.6189 13.5597H16.5337V20.1904H15.545V11.4632Z"
                            fill="white"
                          />
                        </svg>

                        <svg
                          class="profile-overlap"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15.5"
                            fill="#6E52FF"
                            stroke="white"
                          />
                          <path
                            d="M9.40439 20.1904V11.4632H12.4555C13.0635 11.4632 13.5649 11.5683 13.9598 11.7785C14.3547 11.9859 14.6487 12.2657 14.8419 12.618C15.0351 12.9674 15.1317 13.3552 15.1317 13.7813C15.1317 14.1563 15.0649 14.466 14.9314 14.7103C14.8007 14.9546 14.6274 15.1478 14.4115 15.2899C14.1984 15.4319 13.9669 15.537 13.7169 15.6052V15.6904C13.9839 15.7075 14.2524 15.8012 14.5223 15.9717C14.7922 16.1421 15.018 16.3865 15.1998 16.7046C15.3817 17.0228 15.4726 17.412 15.4726 17.8722C15.4726 18.3097 15.3731 18.7032 15.1743 19.0526C14.9754 19.4021 14.6615 19.6791 14.2325 19.8836C13.8035 20.0882 13.2453 20.1904 12.5578 20.1904H9.40439ZM10.4612 19.2529H12.5578C13.2481 19.2529 13.7382 19.1194 14.028 18.8524C14.3206 18.5825 14.4669 18.2558 14.4669 17.8722C14.4669 17.5768 14.3916 17.3041 14.241 17.0541C14.0905 16.8012 13.876 16.5995 13.5976 16.449C13.3192 16.2955 12.9896 16.2188 12.6089 16.2188H10.4612V19.2529ZM10.4612 15.2984H12.4214C12.7396 15.2984 13.0266 15.2359 13.2822 15.1109C13.5408 14.9859 13.7453 14.8097 13.8959 14.5825C14.0493 14.3552 14.126 14.0882 14.126 13.7813C14.126 13.3978 13.9925 13.0725 13.7254 12.8055C13.4584 12.5356 13.0351 12.4007 12.4555 12.4007H10.4612V15.2984ZM16.9193 20.1904V19.4234L21.6239 12.4007H16.8682V11.4632H22.8852V12.2302L18.1807 19.2529H22.9364V20.1904H16.9193Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div class="card-burger">
                        <img id='priority-icon' src="../img/png/prio-${task[1]['priority']}.png" />
                      </div>
                    </div>
                  </div>
                </div>`;
}