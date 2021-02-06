// 必要な変数
let doRadromFlag = false;
let sortChangeFlag = false;

/**　onload */
function onload() {
  referTable();
  addBtnEvent();
  stopBtnEvent();
  sortBtnEvent();
  clearBtnEvent();
  refreshBtnEvent();
}

/**　page element event */

// テーブルを描画
function referTable() {
  const tbodyRef = document.getElementsByTagName('tbody')[0];
  const theadRef = document.getElementsByTagName('thead')[0];
  TABLE_DATA.forEach((item) => {
    tbodyRef.insertRow(0);

    const e = theadRef.rows.length - 1;
    const cellSize = theadRef.rows[e].cells.length;

    for (let c = 0, m = cellSize; c < m; c++) {
      tbodyRef.rows[0].insertCell(c);
      if (c === 0) {
        const newContent = document.createTextNode(`${item.id}`);
        tbodyRef.rows[0].cells[c].appendChild(newContent);
      } else if (c === 1) {
        const oImg = document.createElement('img');
        oImg.setAttribute('src', `./${item.thumbnailUrl}`);
        tbodyRef.rows[0].cells[c].appendChild(oImg);
      } else if (c === 2) {
        const newContent = document.createTextNode(`${item.name}`);
        tbodyRef.rows[0].cells[c].appendChild(newContent);
      } else if (c === 3) {
        const newContent = document.createTextNode(`${item.price}`);
        tbodyRef.rows[0].cells[c].appendChild(newContent);
      }
    }
  });
}

// refresh table row
function refreshTable() {
  clearTbody();
  referTable();
}

// clear tbody function
function clearTbody() {
  const tbodyRef = document.getElementsByTagName('tbody')[0];
  tbodyRef.innerHTML = '';
}

// add btn function
function addBtnEvent() {
  const addBtn = document.querySelector('.js-start-random');
  addBtn.addEventListener('click', () => {
    doRadromFlag = true;
    const doRandom = setInterval(() => {
      randomSort(TABLE_DATA);
      refreshTable();
      if (doRadromFlag !== true) {
        clearInterval(doRandom);
      }
    }, 1000);
  });
}

// stop btn function
function stopBtnEvent() {
  const stopBtn = document.querySelector('.js-stop-random');
  stopBtn.addEventListener('click', () => {
    doRadromFlag = false;
  });
}
// sort btn function
function sortBtnEvent() {
  const sortBtn = document.querySelector('.js-sort');
  sortBtn.addEventListener('click', () => {
    if (sortChangeFlag) {
      TABLE_DATA.sort(compareUp('price'));
      refreshTable();
      sortChangeFlag = false;
    } else {
      TABLE_DATA.sort(compareDown('price'));
      refreshTable();
      sortChangeFlag = true;
    }
  });
}

// clear btn function
function clearBtnEvent() {
  const clearBtn = document.querySelector('.js-clear');
  clearBtn.addEventListener('click', () => {
    clearTbody();
  });
}

// refresh btn function
function refreshBtnEvent() {
  const refreshBtn = document.querySelector('.js-refresh');
  refreshBtn.addEventListener('click', () => {
    clearTbody();
    showLoading();
    fetch('https://run.mocky.io/v3/4aea2343-f45c-46ee-9fcf-6af76640b76f')
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        TABLE_DATA = payload;
        refreshTable();
        hideLoading();
      });
  });
}

function showLoading() {
  const loadingIcon = document.querySelector('.loading');
  loadingIcon.classList.remove('hide-el');
}

function hideLoading() {
  const loadingIcon = document.querySelector('.loading');
  loadingIcon.classList.add('hide-el');
}

/**　helper */

// random sort function
function randomSort(array) {
  array.sort(() => Math.random() - 0.5);
}

// sort up
function compareUp(propertyName) {
  return function (object1, object2) {
    const a = object1[propertyName];
    const b = object2[propertyName];
    return a - b;
  };
}

// sort down
function compareDown(propertyName) {
  return function (object1, object2) {
    const a = object1[propertyName];
    const b = object2[propertyName];
    return b - a;
  };
}

onload();
