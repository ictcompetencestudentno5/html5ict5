class Hero {
    constructor(n) {
        this.name = n;
        this.health = 100;
        this.weapon = null;
        this.weaponName = '';
    }
    setWeapon(w) {
        this.weapon = weapons[w];
        this.weaponName = w;
        MessageLog(`${this.name} has chosen the ${this.weaponName} as their weapon!`);
    }

    attack(opponent) {
        if (Math.random() < this.weapon.hitChance) {
            const damage = Math.floor(Math.random() * (this.weapon.maxDamage - this.weapon.minDamage + 1)) + this.weapon.minDamage;
            MessageLog(`${this.name} attacks ${opponent.name} with a ${this.weaponName} for ${damage} damage!`);
            opponent.takeDamage(damage);
        } else {
            MessageLog(`${this.name} missed the attack with their ${this.weaponName}!`);
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        MessageLog(`${this.name} now has ${this.health} health remaining.`);
        updateHealthDisplay();
        if (this.health <= 0) {
            const winner = this === player1 ? player2 : player1;
            MessageLog(`${this.name} has been defeated! ${winner.name} wins!`);
        }
    }
}

const weapons = {
    Sword: { minDamage: 15, maxDamage: 25, hitChance: 0.8 },
    Axe: { minDamage: 20, maxDamage: 30, hitChance: 0.7 },
    Bow: { minDamage: 10, maxDamage: 20, hitChance: 0.9 }
};

let player1, player2;
let currentPlayer = 1;

function validateNames() {
    const p1 = document.getElementById("player1-name").value.trim();
    const p2 = document.getElementById("player2-name").value.trim();
    const startBtn = document.getElementById("start-game");
    startBtn.disabled = !(p1 && p2);
}

function startGame() {
    alert("Welcome to the Two-Player Text-Based Battle Game! Each player will choose a weapon and take turns attacking each other until one player's health reaches zero. Let the battle begin!");
    player1 = new Hero(document.getElementById("player1-name").value.trim());
    player2 = new Hero(document.getElementById("player2-name").value.trim());
    document.getElementById("player1-title").innerHTML = player1.name;
    document.getElementById("player2-title").innerHTML = player2.name;
    updateHealthDisplay();
    document.getElementById("player-input").style.display = "none";
    MessageLog("The battle begins between " + player1.name + " and " + player2.name + "!");
}

function MessageLog(msg) {
    const gamelog = document.getElementById("game-log");
    gamelog.innerHTML += `<p>${msg}</p>`;
    gamelog.scrollTop = gamelog.scrollHeight;
}

function selectWeapon(player, weapon, imgElem) {
    const hero = player === 1 ? player1 : player2;
    hero.setWeapon(weapon);
    // Highlight selection
    const container = document.getElementById('player' + player + '-weapon-choices');
    const imgs = container.getElementsByClassName('weapon-img');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove('weapon-selected');
    }
    imgElem.classList.add('weapon-selected');
    // Enable attack buttons if both have weapons
    if (player1.weapon && player2.weapon) {
        document.getElementById("player1-attack").disabled = false;
        document.getElementById("player2-attack").disabled = false;
    }
}

function playerAttack(player) {
    if (currentPlayer !== player) return;
    const attacker = player === 1 ? player1 : player2;
    const defender = player === 1 ? player2 : player1;
    attacker.attack(defender);
    if (defender.health <= 0) {
        // Game over
        document.getElementById("player1-attack").disabled = true;
        document.getElementById("player2-attack").disabled = true;
        const winner = player === 1 ? player1 : player2;
        document.getElementById(`player${player}-wins`).innerHTML = parseInt(document.getElementById(`player${player}-wins`).innerHTML) + 1;
        MessageLog(`${winner.name} wins the round!`);
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
}

function updateHealthDisplay() {
    document.getElementById("player1-health").innerHTML = "Health: " + player1.health;
    document.getElementById("player2-health").innerHTML = "Health: " + player2.health;
    // Update health bars
    const p1Bar = document.getElementById("player1-health-bar");
    const p2Bar = document.getElementById("player2-health-bar");
    p1Bar.style.width = (player1.health / 100 * 100) + "%";
    p2Bar.style.width = (player2.health / 100 * 100) + "%";
}
