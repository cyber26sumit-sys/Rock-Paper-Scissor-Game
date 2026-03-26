
        let comp;
        let Result='';
        let score = JSON.parse(localStorage.getItem('X')) || {
                wins: 0,
                loses: 0,
                ties: 0
            };
        let scoreAuto =JSON.parse(localStorage.getItem('Y')) || {  
                wins: 0,
                loses: 0,
                ties: 0
            };    
        updateDisplay("Start the game");

        function Reset() {
            score={
                wins: 0,
                loses: 0,
                ties: 0
            }
            Result='';
            //localStorage.removeItem('X');
            updateDisplay("Score Reset");
        }

        function computerCall() {
            const num = Math.random();
            if (num < 1 / 3) {
                comp = 'rock';
            }
            else if (num < 2 / 3 ) {
                comp = 'paper';
            }
            else {
                comp = 'scissors';
            }
        }
        function RPS(player) {
            updateMODE('YOU v/s COMPUTER');
            computerCall();
            if (player == comp) {
                score.ties++;
                Result='Match Tied!'
            }
            else {
                if (player == 'rock' && comp == 'paper' || player == 'scissors' && comp == 'rock' || player == 'paper' && comp == 'scissors') {
                    score.loses++;
                    Result='Computer won! You Lost!';
                }
                else if (comp == 'rock' && player == 'paper' || comp == 'scissors' && player == 'rock' || comp == 'paper' && player == 'scissors') {
                    score.wins++;
                    Result='You won! Computer Lost!';
                }
            }
            localStorage.setItem('X', JSON.stringify(score));
            updateDisplay(`You :<img src="/Mini Projects/Images/${player}-emoji.png" class='chose'>   Computer: <img src="/Mini Projects/Images/${comp}-emoji.png" class='chose'>`);
           // alert(`You: ${player}  Computer: ${comp} \n\n Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`);
        }

        function updateDisplay(result){
            document.querySelector('#display')
            .innerHTML=`${result}<br> <br>${Result}<br><br> Wins : ${score.wins}    Loses : ${score.loses}  Ties :  ${score.ties}`;
        }
        let autoValue;
        function Autochose(){
           const autoNum=Math.random();
           if (autoNum < 1 / 3) {
                autoValue ='rock';
            }
            else if (autoNum < 2 / 3 ) {
                autoValue = 'paper';
            }
            else {
                autoValue = 'scissors';
            }
        }
        let intervalID;
        function Autoplay(scoreAuto){
            scoreAuto={
            wins: 0,
            loses: 0,
            ties: 0
        }
        startInterval();
        updateMODE('Computer-1 is playing on behalf of you.');
        localStorage.setItem('Y', JSON.stringify(scoreAuto));
        updateDisplay('');
            intervalID = setInterval(()=>{  
                           
                computerCall();
                Autochose();
                if ( autoValue== comp) {
                scoreAuto.ties++;
                Result='Match Tied!'
                }
                else {
                    if (autoValue == 'rock' && comp == 'paper' || autoValue == 'scissors' && comp == 'rock' || autoValue == 'paper' && comp == 'scissors') {
                        scoreAuto.loses++;
                        Result='Computer-2 won! Computer-1 Lost!';
                    }
                    else if (comp == 'rock' && autoValue == 'paper' || comp == 'scissors' && autoValue == 'rock' || comp == 'paper' && autoValue == 'scissors') {
                        scoreAuto.wins++;
                        Result='Computer-1 won! Computer-2 Lost!';
                    }
                }
                
                updateDisplay(`Computer-1 :<img src="/Mini Projects/Images/${autoValue}-emoji.png" class='chose'>   Computer-2 : <img src="/Mini Projects/Images/${comp}-emoji.png" class='chose'>`);
                },1000);
        }
        function stopInterval(){
            updateMODE('');
            clearInterval(intervalID);
            intervalID==null;
        }
         function startInterval(){
             if(intervalID){
                 clearInterval(intervalID);
 
             }
         }
        startInterval();  
function updateMODE(_mode){
    document.querySelector('#mode').innerHTML=`${_mode}`;
}
function resumeAutoplay(){
    startInterval();
    Autoplay();
}