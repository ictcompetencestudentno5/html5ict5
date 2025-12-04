let enemy1 = 100;   
let enemy2 = 100;
let playerHP = 100;

let swordDamage = 20;
let bowDamage = 15;

let currentEnemy1HP = enemy1;
let currentEnemy2HP = enemy2;

console.log("game console")
document.getElementById("enemystr").innerHTML = 
    `Enemy 1 HP: ${enemy1} <br> Enemy 2 HP: ${enemy2}`;

document.getElementById("attackBtn").addEventListener("click", function() {        
    let enemyChoice = document.getElementById("enemySelect").value;
    let weaponChoice = document.getElementById("weaponSelect").value;
    let result = "";

    // Disable the attack button immediately to enforce a cooldown
    const attackBtn = document.getElementById("attackBtn");
    if (attackBtn) {
        attackBtn.disabled = true;
        attackBtn.textContent = "Waiting...";
    }

    if (enemyChoice === " " || weaponChoice === " ") {
        result = "Please select both an enemy AND a weapon!";
        document.getElementById("result").innerText = result;
        return;
    }

    let damage;
    let weaponName;
    switch(weaponChoice) {
        case "sword":
            damage = swordDamage;
            weaponName = "SWORD";
            break;
        case "bow":
            damage = bowDamage;
            weaponName = "BOW";
            break;
    }

    for (let i = 1; i <= 2; i++) {

        let currentEnemy = "enemy" + i;
        
        if (currentEnemy === enemyChoice) {
            let currentHP = (i === 1) ? currentEnemy1HP : currentEnemy2HP;
            result += `\nATTACKING ENEMY ${i} WITH ${weaponName}\n`;
                result += `Enemy HP before attack: ${currentHP}\n`;
                result += `Damage dealt: ${damage}\n`;

                currentHP -= damage;
                if (i === 1) currentEnemy1HP = currentHP;
                else currentEnemy2HP = currentHP;

                result += `Enemy HP after attack: ${Math.max(0, currentHP)}\n`;

                if (currentHP <= 0) {
                    result += "ENEMY DEFEATED!\n";
                } else {
                    result += "Enemy survives the attack!\n";
                }

                switch(weaponName) {
                    case "SWORD":
                        result += "Weapon: Close-range melee attack";
                        break;
                    case "BOW":
                        result += "Weapon: Long-range ranged attack";
                        break;
                }

                document.getElementById("result").innerText = result;

                document.getElementById("enemystr").innerHTML = 
                    `Enemy 1 HP: ${Math.max(0, currentEnemy1HP)} <br> Enemy 2 HP: ${Math.max(0, currentEnemy2HP)}`;

                
                let min = 15;
                let max = 20;
                let enemydamage = Math.floor(Math.random() * (max - min + 1)) + min;
                console.log(`Enemy Damange ` + enemydamage);
                setTimeout(function() {
                    if (enemydamage <= 15) {
                        playerHP -= enemydamage;
                        console.log(`The enemy used bow ${enemydamage} damage!`);
                        console.log(`Player HP is now: ${playerHP}`);
                    } else if (enemydamage > 15) {
                        playerHP -= enemydamage;
                        console.log(`The enemy used sword ${enemydamage} damage!`);
                        console.log(`Player HP is now: ${playerHP}`);
                    } else {
                        console.log("The enemy missed!");
                    }

                    // re-enable the attack button after the enemy action completes
                    if (attackBtn) {
                        attackBtn.disabled = false;
                        attackBtn.textContent = "Attack!";
                    }

                }, 2000);

                function resetGame() {
                    playerHP = 100;
                    currentEnemy1HP = enemy1;
                    currentEnemy2HP = enemy2;


                    document.getElementById("enemySelect").value = " ";
                    document.getElementById("weaponSelect").value = " ";


                    document.getElementById("enemystr").innerHTML = 
                        `Enemy 1 HP: ${enemy1} <br> Enemy 2 HP: ${enemy2}`;


                    document.getElementById("result").innerText = "";
                }


                function checkGameOver(lastAttackedEnemyHP, enemyName) {
                    if (playerHP <= 0) {
                        document.getElementById("result").innerText = "PLAYER DEFEATED! GAME OVER!";
                        console.log("PLAYER DEFEATED! GAME OVER!");
                        console.log("Resetting game in 2 second...");
                        setTimeout(resetGame, 2000);
                        console.clear();
                        return true;
                    } else if (lastAttackedEnemyHP <= 0) {
                        document.getElementById("result").innerText = `${enemyName} DEFEATED! YOU WIN!`;
                        console.log(`${enemyName} DEFEATED! YOU WIN!`);
                        console.log("Resetting game in 2 second...");
                        setTimeout(resetGame, 2000);
                        console.clear();
                        return true;
                    }
                    return false;
                }

                if (currentEnemy1HP <= 0 && enemyChoice === "enemy1") {
                    if (checkGameOver(currentEnemy1HP, "Enemy 1")) return;
                }
                if (currentEnemy2HP <= 0 && enemyChoice === "enemy2") {
                    if (checkGameOver(currentEnemy2HP, "Enemy 2")) return;
            }
        }
    }
});

