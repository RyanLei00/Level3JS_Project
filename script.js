function initialize() {
  input = document.getElementById("inputs");
  dTable = document.getElementById("table");
  freq = document.getElementById("freqtable");
}

function addHeader(tableName, newHeader, trId) {
  let th = document.createElement("th");
  trId.appendChild(th)
  th.innerHTML = newHeader;
  th.id = newHeader;
}

function reset() {
  let doubles = document.getElementById("Doubles");
  let triples = document.getElementById("Triples");
  delHeader(doubles);
  delHeader(triples);
  delRows(dTable);
  delRows(freq);
}

function delHeader(header) {
  (header != null) ? header.remove() : null;
}

function delRows(tb) {
  let numRows = tb.rows.length - 1;
  for (let i = numRows; i > 0; i--) {
    tb.delRow(i);
  }
}

function evaluateRoll() {
  reset();
  setValues();
  (numDice === 2 || numDice === 3) ? addHeader(dTable, "Doubles", dtablehead) : null;
  (numDice === 3) ? addHeader(dTable, "Triples", dtablehead) : null;
  for (let i = 0; i < numRolls; i++) {
    let roll = 0;
    if (numDice === 1) {
      let die1 = parseInt(Math.random() * 6 + 1);
      roll = die1;
    } else if (numDice === 2) {
      let die1 = parseInt(Math.random() * 6 + 1);
      let die2 = parseInt(Math.random() * 6 + 1);
      roll = die1 + die2;
      (die1 === die2) ? (numDoubles++) : null;
    } else {
      let die1 = parseInt(Math.random() * 6 + 1);
      let die2 = parseInt(Math.random() * 6 + 1);
      let die3 = parseInt(Math.random() * 6 + 1);
      roll = die1 + die2 + die3;
      (die1 === die2 === die3) ? (numTriples++) : (die1 === die2 || die1 === die3 || die2 === die3) ? (numDoubles++) : null;
    }
    frequency.splice((roll - 1), 1, (frequency.at(roll - 1) + 1));
    total += roll;
    rolls.push(roll);
  }
  for (let i = 0; i < frequency.length; i++) {
    let firstRow = freq.insertRow();
    let cell0 = firstRow.insertCell(0);
    let cell1 = firstRow.insertCell(1);
    cell0.innerHTML = i + 1;
    cell1.innerHTML = frequency.at(i);
  }
  mean = total / numRolls;
  mean = Math.round(100 * mean) / 100;
  let firstRow = dTable.insertRow();
  cell0 = firstRow.insertCell(0);
  cell0.innerHTML = mean;
  for (let i = 0; i < frequency.length; i++) {
    if (i === 0) {
      maxFrequency = frequency.at(i);
      mode = i + 1;
    } else {
      if (frequency.at(i) > maxFrequency) {
        mode = i + 1;
        maxFrequency = frequency.at(i);
      }
      else if (frequency.at(i) === maxFrequency) {
        mode = mode + ", " + (i + 1);
      }
    }
  }
  cell1 = firstRow.insertCell(1);
  cell1.innerHTML = mode;
  rolls.sort((a, b) => a - b);
  if ((numRolls % 2) === 0) {
    median = (rolls.at((rolls.length / 2)) + rolls.at(rolls.length / 2 - 1)) / 2;
    cell2 = firstRow.insertCell(2);
    cell2.innerHTML = median;
  } else {
    median = rolls.at(parseInt(rolls.length / 2));
    cell2 = firstRow.insertCell(2);
    cell2.innerHTML = median;
  }
  if (numDice === 2) {
    cell3 = firstRow.insertCell(3);
    cell3.innerHTML = numDoubles;
  } else if (numDice === 3) {
    cell3 = firstRow.insertCell(3);
    cell3.innerHTML = numDoubles;
    cell4 = firstRow.insertCell(4);
    cell4.innerHTML = numTriples;
  }
}
setValues = () => { mode = 0; currentFrequency = 0; maxFrequency = 0; total = 0; numDoubles = 0; numTriples = 0; mean = 0; median = 0; mode = 0; numDice = input.nDice.value; numRolls = input.nRolls.value; input.nDice.value = ""; input.nRolls.value = ""; highestTotalRoll = numDice * 6; lowestTotalRoll = numDice; rolls = []; (frequency = []).length = (numDice === 1) ? 6 : (numDice === 2) ? 12 : 18; frequency.fill(0); }
