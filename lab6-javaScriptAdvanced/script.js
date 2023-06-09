document.addEventListener("DOMContentLoaded", function() {
    fetch('https://the-trivia-api.com/api/questions?limit=20&categories=science,history', {
        headers: {
         
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
      .then(data => {console.log(data); 
        DisplayQuestions(data);
        document.getElementById("quiz").addEventListener("submit", (e)=>{
            e.preventDefault();
            calculateScore(data);
        })
    })
      .catch(err => {console.log(err); console.log(124) })
});


function displayQ(data, i){
    let form = document.getElementById("quiz");
    let cardiv = document.createElement("div");
    // cardiv.setAttribute("class", "card");
    cardiv.classList.add("card");
    h3 = document.createElement("h3");
    h3.innerText = "Question " + (i+1);
    p = document.createElement("p");
    p.innerText = data.question;
    cardiv.appendChild(h3);
    cardiv.appendChild(p);
    form.appendChild(cardiv);

    optdiv= document.createElement("div");
    optdiv.classList.add("options");

    answers=data.incorrectAnswers;
    answers.push(data.correctAnswer);

    console.log(answers);
    answers.sort(()=> Math.random() - 0.5);
    console.log(answers);

    for(let j=0; j<answers.length; j++){
       
        div= document.createElement("div");

        label = document.createElement("label");
        inp = document.createElement("input");

        label.innerText=answers[j];
        inp.type="radio";
        inp.name="q"+i;
        inp.id="q"+i+"o"+j;
        inp.value= answers[j];

        div.appendChild(inp)
        div.appendChild(label)
        optdiv.appendChild(div);


    }
    buttondiv =document.createElement("button");
    buttondiv.classList.add("submit");
    buttondiv.setAttribute("id", "next");
    buttondiv.innerText="Next";
    
 cardiv.appendChild(optdiv);
     cardiv.appendChild(buttondiv);
    form.appendChild(cardiv);

}

function displayQ1(data, i){
    let form = document.getElementById("quiz");
    let cardiv = document.createElement("div");
    // cardiv.setAttribute("class", "card");
    cardiv.classList.add("card");
    h3 = document.createElement("h3");
    h3.innerText = "Question " + (i+1);
    p = document.createElement("p");
    p.innerText = data.question;
    cardiv.appendChild(h3);
    cardiv.appendChild(p);
    form.appendChild(cardiv);

    optdiv= document.createElement("div");
    optdiv.classList.add("options");

    answers=data.incorrectAnswers;
    answers.push(data.correctAnswer);

    console.log(answers);
    answers.sort(()=> Math.random() - 0.5);
    console.log(answers);

    for(let j=0; j<answers.length; j++){
       
        div= document.createElement("div");

        label = document.createElement("label");
        inp = document.createElement("input");

        label.innerText=answers[j];
        inp.type="radio";
        inp.name="q"+i;
        inp.id="q"+i+"o"+j;
        inp.value= answers[j];

        div.appendChild(inp)
        div.appendChild(label)
        optdiv.appendChild(div);


    }
    buttondiv =document.createElement("button");
    buttondiv.classList.add("submit");
    buttondiv.setAttribute("id", "next");
    buttondiv.innerText="Next";
    
 cardiv.appendChild(optdiv);
     cardiv.appendChild(buttondiv);
    form.appendChild(cardiv);

}

function DisplayQuestions(data){
     i=0;

     displayQ(data[i],i);
        document.getElementById("next").addEventListener("click", (e)=>{
            e.preventDefault();
            i++;
            if(i<data.length){
                displayQ1(data[i],i);
            }
            else{
                calculateScore(data);
            }
        })
    button = document.createElement("button");
    button.innerText="Submit";
    button.setAttribute("type", "submit");
    button.setAttribute("id", "submit");
    document.getElementById("quiz").appendChild(button);
}


function calculateScore(data){
    let score=0;
    for(let i=0; i<data.length; i++){
        let q = data[i];
        let options = document.getElementsByName("q"+i);
        for(let j=0; j<options.length; j++){
            if(options[j].checked){
                if(options[j].value == q.correctAnswer){
                    score++;
                }
            }
        }
    }
    alert("Your score is "+score);
    console.log(score);
   
}