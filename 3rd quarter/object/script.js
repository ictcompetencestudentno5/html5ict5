//character

class hero {
    constructor(n) { //parameter
        this.name = n; //name is property -- n is parameter so that you wont get confuse 
        this.health = 100;
    }
}

let player1, player2;
let currentPlayer;

const weapons = {
    sword:{minDamage: 5, crit:10, hitChance: 0.9},
    bow:{minDamage: 7, crit: 14, hitChance: 0.3},
    axe:{minDamage: 4, crit: 8, hitChance: 0.5}
};

function validateNames() {
    let p1 = document.getElementById("player1-name").value.trim();
    let p2 = document.getElementById("player2-name").value.trim();
    document.getElementById("start-game").disabled = !p1 || !p2;
}

function startGame() {
    player1 = new hero(document.getElementById("player1-name").value.trim());
    player2 = new hero(document.getElementById("player2-name").value.trim());
    document.getElementById("player1-title").innerHTML = player1.name;
    document.getElementById("player2-title").innerHTML = player2.name;
    document.getElementById("player1-health").innerHTML = "Health: " + player1.health;
    document.getElementById("player2-health").innerHTML = "Health: " + player2.health;
    document.getElementById("player-input").style.display = "none";
    currentPlayer = 1;
    document.getElementById("player1-attack").disabled = false;
    document.getElementById("player2-attack").disabled = true;
    messageLog("Game start " + player1.name + " vs " + player2.name + ". " + player1.name + " goes first!");
}

function messageLog(msg) {
    const gamelog = document.getElementById("game-log");
    gamelog.innerHTML += `<p>${msg}</p>`;
    gamelog.scrollTop = gamelog.scrollHeight;
}

function playerAttack(playerNum) {
    if (!currentPlayer || currentPlayer !== playerNum) {
        messageLog("It's not your turn!");
        return;
    }

    let attacker, defender;
    if (playerNum === 1) {
        attacker = player1;
        defender = player2;
    } else {
        attacker = player2;
        defender = player1;
    }

    // Get selected weapon
    let weaponName = document.querySelector(`input[name="player${playerNum}-weapon"]:checked`).value.toLowerCase();
    let weapon = weapons[weaponName];

    // Calculate if hit
    let hitChance = weapon.hitChance || 1; // default 100% if no hitChance
    let hit = Math.random() < hitChance;

    if (hit) {
        let isCrit = Math.random() < 0.2;
        let damage;
        
        if (isCrit) {
            damage = weapon.crit + Math.floor(Math.random() * 20); // crit damage
            messageLog(`${attacker.name} lands a critical hit on ${defender.name} with ${weaponName} for ${damage} damage!`);
        } else {
            damage = weapon.minDamage + Math.floor(Math.random() * 15); // normal damage
            messageLog(`${attacker.name} lands a normal hit on ${defender.name} with ${weaponName} for ${damage} damage!`);
        }
        
        defender.health -= damage;

        // Update health display
        document.getElementById(`player${3-playerNum}-health`).innerHTML = "Health: " + defender.health;

        // Update health bar (assuming max 100)
        let healthPercent = Math.max(0, (defender.health / 100) * 100);
        document.getElementById(`player${3-playerNum}-health-bar`).style.width = healthPercent + "%";

        if (defender.health <= 0) {
            messageLog(`${defender.name} is defeated! ${attacker.name} wins!`);
            // Increment wins
            let winsElement = document.getElementById(`player${playerNum}-wins`);
            let wins = parseInt(winsElement.innerHTML) + 1;
            winsElement.innerHTML = wins;
            // Reset health
            defender.health = 100;
            document.getElementById(`player${3-playerNum}-health`).innerHTML = "Health: " + defender.health;
            document.getElementById(`player${3-playerNum}-health-bar`).style.width = "100%";
        }
    } else {
        messageLog(`${attacker.name} misses the attack with ${weaponName}!`);
    }

    // Switch turns
    currentPlayer = 3 - currentPlayer;
    // Disable/enable buttons
    document.getElementById("player1-attack").disabled = currentPlayer !== 1;
    document.getElementById("player2-attack").disabled = currentPlayer !== 2;
}


