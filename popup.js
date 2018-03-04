days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

function printDay(date) {
  return `${date.getDate()}${suffixes[date.getDate() % 10]}`;
}

function add(tableElement, offset, date) {
  let row = tableElement.insertRow(-1);
  let offsetCell = row.insertCell(-1);
  if (offset === 0) {
    offsetCell.innerHTML = `today`;
  } else {
    offsetCell.innerHTML = `+${offset}d`;
  }

  let dateCell = row.insertCell(-1);
  const id = `date-${offset}`;
  let formattedDate =
    `${days[date.getDay()]}, ${months[date.getMonth()]} ${printDay(date)}`;
  dateCell.innerHTML = `<input type="text" id=${id} value="${formattedDate}" readonly />`

  let actionCell = row.insertCell(-1);
  let button = document.createElement('button');
  let label = document.createTextNode('copy');
  button.appendChild(label);
  actionCell.appendChild(button);
  button.addEventListener('click', (event) => {
    let textField = document.getElementById(id);
    textField.select();
    document.execCommand('copy');
  });
}

function refresh() {
  let contentTable = document.getElementById('content-table');
  contentTable.innerHTML = '';

  let date = new Date();
  for (let i = 0; i < 14; i++) {
    add(contentTable, i, date);
    date.setDate(date.getDate() + 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refresh();
});
