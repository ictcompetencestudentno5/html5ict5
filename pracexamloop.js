let enemy1 = 20;   
let enemy2 = 30;
let attackPower = 25;



document.getElementById("attackBtn").addEventListener("click", function() {        
    let enemyChoice = document.getElementById("enemySelect").value;
    let result = "";


            
    for (let i = 1; i <= 2; i++) {
        let hp;
        switch(i) {
            case 1: hp = enemy1; break;
            case 2: hp = enemy2; break;
        }
        let currentEnemy = "enemy" + i;
            if (currentEnemy === enemyChoice) {
                result += "Attacking Enemy " + i + "\n";
                result += "Enemy HP before attack: " + hp + "\n";

                
            if (attackPower >= hp) {
                result += "Enemy defeated!\n";
            } else {
                result += "Enemy survives!\n";
            }



                    
            switch(true) {
                case (hp <= 20):
                    result += "Enemy type: Weak enemy";
                    break;
                case (hp <= 30):
                    result += "Enemy type: Normal enemy";
                    break;
                default:
                    result += "Enemy type: Strong enemy";
                    }
                }
            }

            if (result === "") {
                result = "Please choose an enemy!";
            }

            document.getElementById("result").innerText = result;

            console.log(result);
});