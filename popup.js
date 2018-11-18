days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];

function printDay(date) {
  return `${date.getDate()}${suffixes[date.getDate() % 10]}`;
}

function setAndCopy(textField, value, messageField) {
  textField.value=value;
  textField.select();
  document.execCommand('copy');
  messageField.innerHTML = 'copied!';
}

function add(tableElement, offset, date) {
  let row = tableElement.insertRow(-1);
  let offsetCell = row.insertCell(-1);
  if (offset === 0) {
    offsetCell.innerHTML = `today`;
  } else {
    offsetCell.innerHTML = `+${offset}d`;
  }

  let textField = document.getElementById('nf-copy-field');
  let messageField = document.getElementById('nf-message');

  let humanFriendlyDate =
    `${days[date.getDay()]}, ${months[date.getMonth()]} ${printDay(date)}`;
  let humanFriendlyCell = row.insertCell(-1);
  let humanFriendlyButton = document.createElement('button');
  let humanFriendlyLabel = document.createTextNode(humanFriendlyDate);
  humanFriendlyButton.appendChild(humanFriendlyLabel);
  humanFriendlyCell.appendChild(humanFriendlyButton);
  humanFriendlyButton.addEventListener('click', (event) => {
    setAndCopy(textField, humanFriendlyDate, messageField);
  });

  let isoDate = date.toISOString().split("T")[0];
  let isoCell = row.insertCell(-1);
  let isoButton = document.createElement('button');
  let isoLabel = document.createTextNode(isoDate);
  isoButton.appendChild(isoLabel);
  isoCell.appendChild(isoButton);
  isoButton.addEventListener('click', (event) => {
    setAndCopy(textField, isoDate, messageField);
  });
}

function refresh() {
  let contentTable = document.getElementById('nf-table');
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
