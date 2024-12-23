

let gamecontainer = document.querySelector("#gamecontainer");
let table = []; // création du tableau 2D
let divreponse = document.querySelector("#divreponse")
let winner = null;
let gameOver = false


for (let row = 0; row < 7; row++) {
  table[row] = []; // initialisation de chaque ligne
  let rowElement = document.createElement("div");
  rowElement.className = "row";
  gamecontainer.appendChild(rowElement);
  for (let col = 0; col < 6; col++) {
    let caseElement = document.createElement("div");
    caseElement.className = "puissancequatrecase";
    rowElement.appendChild(caseElement);
    table[row][col] = null; // initialisation de chaque case
  }
}

let turn = "player1";
let puissancequatrecase = document.querySelectorAll(".puissancequatrecase");

let lap = 1;
puissancequatrecase.forEach((element, index) => {
  element.addEventListener("click", function () {
    let row = Math.floor(index / 6);
    let col = index % 6;
    if (lap % 2 === 0 && table[row][col] === null) {
      table[row][col] = "red";
    } else if (lap % 2 !== 0 && table[row][col] === null) {
      table[row][col] = "blue";
    }

    gravity();

    // Mettre à jour les éléments HTML
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 6; c++) {
        let element = puissancequatrecase[r * 6 + c];
        if (table[r][c] === "red") {
          element.style.backgroundColor = "red";
        } else if (table[r][c] === "blue") {
          element.style.backgroundColor = "blue";
        } else {
          element.style.backgroundColor = "";
        }
      }
    }

    lap++;
    checkWin();
  });
});
function checkWin() {
  // vérification des lignes
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      if (table[row][col] && table[row][col] === table[row][col + 1] && table[row][col] === table[row][col + 2] && table[row][col] === table[row][col + 3]) {
        winner = table[row][col];
        break;
      }
    }
  }
  // vérification des colonnes
  for (let col = 0; col < 6; col++) {
    for (let row = 0; row < 4; row++) {
      if (table[row][col] && table[row][col] === table[row + 1][col] && table[row][col] === table[row + 2][col] && table[row][col] === table[row + 3][col]) {
        winner = table[row][col];
        break;
      }
    }
  }
  // vérification des diagonales
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (table[row][col] && table[row][col] === table[row + 1][col + 1] && table[row][col] === table[row + 2][col + 2] && table[row][col] === table[row + 3][col + 3]) {
        winner = table[row][col];
        break;
      }
    }
  }
  for (let row = 3; row < 7; row++) {
    for (let col = 0; col < 3; col++) {
      if (table[row][col] && table[row][col] === table[row - 1][col + 1] && table[row][col] === table[row - 2][col + 2] && table[row][col] === table[row - 3][col + 3]) {
        winner = table[row][col];
        break;
      }
    }
  }
  if (winner !== null) {
    divreponse.innerHTML = `Le joueur ${winner === "red" ? "1" : "2"} a gagné !`;
            divreponse.style.color = "white"
        divreponse.style.fontSize = "20px"
gameOver = true
  }
}



function gravity() {
  for (let row = 0; row < 7; row++) {
    let col = table[row].length - 1; 
    while (col >= 0) {
      if (table[row][col]!== null) {
        let newCol = col;
        while (newCol < table[row].length - 1 && table[row][newCol + 1] === null) {
          table[row][newCol + 1] = table[row][newCol];
          table[row][newCol] = null;
          newCol++;
        }
      }
      col--;
    }
  }
}