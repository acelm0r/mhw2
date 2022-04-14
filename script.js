function lunghezza(obj){
    let x = 0;
    for(let i in obj){
        x++;
    }
    return x;
}

function selezionaRisposta(event){
    event.currentTarget.classList.add("selezionato");
    event.currentTarget.classList.remove("non_selezionato");
    event.currentTarget.querySelector(".checkbox").src = "images/checked.png";
    const risposta_selezionata = event.currentTarget.dataset.choiceId;
    const altre_risposte = event.currentTarget.parentNode.querySelectorAll("div");
    for(let altra_risposta of altre_risposte){
        if(altra_risposta.dataset.choiceId !== risposta_selezionata){
            altra_risposta.classList.add("non_selezionato");
            altra_risposta.classList.remove("selezionato");
            altra_risposta.querySelector(".checkbox").src = "images/unchecked.png";
        }
    }
    risposte_selezionate[event.currentTarget.dataset.questionId] = risposta_selezionata;
    if(lunghezza(risposte_selezionate) === 3){                  //
        const risposte = document.querySelectorAll(".choice-grid div");
        for(let risposta of risposte){
            risposta.removeEventListener("click", selezionaRisposta);
        }
            const conta = {};
            for(i in risposte_selezionate){
                const risposta = risposte_selezionate[i];
                if(!conta[risposta]){
                    conta[risposta] = 0;
                }
                conta[risposta]++;
            }

            let x = null;
            let y = 0;
            for(let risposta in conta){
                if(conta[risposta] > y){
                    x = risposta;
                    y = conta[risposta];
                }
            }

            const title = RESULTS_MAP[x].title;
            const contents = RESULTS_MAP[x].contents;
            const risultato = document.querySelector("#risultato");
            risultato.querySelector("h1").textContent = title;
            risultato.querySelector("p").textContent = contents;
            risultato.classList.remove("hidden");
    }
}

function riavvia(){
    risposte_selezionate = {};
    const risposte = document.querySelectorAll(".choice-grid div");
    for(risposta of risposte){
        risposta.addEventListener("click", selezionaRisposta);
        risposta.classList.remove("selezionato");
        risposta.classList.remove("non_selezionato");
        risposta.querySelector(".checkbox").src = "images/unchecked.png";
    }
    risultato.classList.add("hidden");
}

let risposte_selezionate = {};
riavvia();
const bottone = document.querySelector("div.button");
bottone.addEventListener("click", riavvia());