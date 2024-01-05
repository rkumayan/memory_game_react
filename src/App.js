
import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';

const cardImages = [
  { "src" : "/img/helmet-1.png", matched :false},
  { "src" : "/img/potion-1.png", matched :false},
  { "src" : "/img/ring-1.png"  , matched :false},
  { "src" : "/img/scroll-1.png", matched :false},  
  { "src" : "/img/shield-1.png", matched :false},
  { "src" : "/img/sword-1.png" , matched :false}
];

function App() {
  const [cards , setCards] = useState([]);
  const [turns , setTurns] = useState(0);
  const [choiceOne , setChoiceOne] = useState(null);
  const [choiceTwo , setChoiceTwo] = useState(null);
  
  // shuffle and duplicate cards
  const shuffleCards = () =>{ 
    const shuffledCards = [ ...cardImages, ...cardImages]
      .sort( () => Math.random() - 0.5)
      .map( (card) =>( {...card , id : Math.random()} ));
    

    setCards( shuffledCards);
    setTurns(0);
  }
  
  // call the function shuffle cards at the beginning
  useEffect( ()=>{
    shuffleCards();
    
  }, []);
  console.log(cards);
  // compare two selected cards
  useEffect( () =>{
    if( choiceOne && choiceTwo){
      if( choiceOne.src == choiceTwo.src){
        console.log( "choices are same" , cards , cards.length);
        // let temp = [];
        // for( let i = 0; i < 12; ++i){
        //   temp.push(cards[i]);
        //   if( cards[i].src == choiceOne.src)
        //     temp[i].matched = true;
        // }
        // console.log(temp);
        // setCards(temp);
        
        
        setCards( prev => {
          return prev.map( (card) =>{
            if( card.src == choiceOne.src)
              return {...card , matched : true}
            else return card;
          })
        })

      }
      resetTurn();
    }

  }, [choiceOne , choiceTwo]);

  // handle the user's choice
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //reset choices and increase turn
  const resetTurn = () =>{
    console.log( "reset called");
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns( a => a + 1);
  }
  
  return (
    <div className="App">
      <h1>Magic match</h1>
      <button onClick = { shuffleCards}> New Game</button>
      Turns : {turns}
      <div className="card-grid">
        {cards.map( card => (
          <Card card = {card} key = {card.id} handleChoice= {handleChoice}/>
        ))}

      </div>
    </div>
  );
}

export default App;
