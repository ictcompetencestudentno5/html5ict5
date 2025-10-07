const question = [
    {
        q: `Write the HTML tag that has the largest heading with the text of "Hello Word"`,
        a: `<h1>Hello Word</h1>`
    },

    {
        q: `Write a paragraph with the text of "This is paragraph"`,
        a: `<p>This is paragraph</p>`
    },
    
    {
        q: `The __ tag defines a line break, and is an empty element without a closing tag:`,
        a: `<br>`
    },

    {
        q: `This tag defines a hyperlink. The "href" attribute specifies the URL of the page the link goes to:`,
        a: `<a href=""></a>`
    },

        {
        q: `The <___> tag is used to embed an image in an HTML page.`,
        a: `<img>`
    },

        {
        q: `src means?`,
        a: `source`
    },
];

let current = 0;

function checkAnswer(){
    let userAnswer = document.getElementById("answer").value.trim();
    let result = document.getElementById("result");

    if (userAnswer === question[current].a){
        result.style.color = "green"
        result.innerText = "Correct"
        
        //Move to next question for 1 sec 
        setTimeout(() => {
            current++;
            if (current < question.length) {
                document.getElementById("question").innerText = question[current].q;
                document.getElementById("answer").value  =  "";
                result.innerText = "";
            } else {
                document.getElementById("game-box").innerHTML = `great job`;
            }
        }, 1000);
    } else {
        result.style.color = "red";
        result.innerText = "your answer is not quite right";
    }
}