
import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';

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
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // shuffle and duplicate cards
  const shuffleCards = () =>{ 
    const shuffledCards = [ ...cardImages, ...cardImages]
      .sort( () => Math.random() - 0.5)
      .map( (card) =>( {...card , id : Math.random()} ));
    

    setCards( shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
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
      setDisabled(true);
      if( choiceOne.src == choiceTwo.src){
        console.log( "choices are same" , cards , cards.length);
                        
        setCards( prev => {
          return prev.map( (card) =>{
            if( card.src == choiceOne.src)
              return {...card , matched : true}
            else return card;
          })
        })

      }
      setTimeout( () => resetTurn() , 1000);
      
    }

  }, [choiceOne , choiceTwo]);

  // show the modal at the end of the game
  useEffect( () =>{
    let cnt = 0;
    for( let i = 0; i < cards.length; ++i)    if( cards[i].matched )  cnt += 1;
    if( cnt == 12){
      setTimeout( () => setShowModal(true) , 700);
      
    }
  } ,[ cards]);
  //reset choices and increase turn
  const resetTurn = () =>{
    console.log( "reset called");
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns( a => a + 1);
    setDisabled(false);
  }


  // handle the user's choice
  const handleChoice = (card)=>{
    if( choiceOne && choiceTwo)   return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  
  
  return (
    <div className="App">
      <h1>Magic match</h1>
      <div className="navbar">
        <button onClick = { shuffleCards}> New Game</button>
        <p> Turns : {turns} </p>
        
        
      </div>
      
      <div className="card-grid">
        {cards.map( card => (
          <Card card = {card} key = {card.id}
           handleChoice= {handleChoice}
           flipped = { card === choiceOne || card === choiceTwo || card.matched}
           disabled = {disabled}
           />
        ))}

      </div>
      {showModal &&
      <Modal>
        <div className="modal">
          <button className="delete" onClick={ () => { 
            setShowModal(false);
            shuffleCards();
            } }>X</button>
          <h2> YaY, You completed the game in {turns} turns</h2>
          <p> Congrats Champ!!!</p>
        </div>            
      </Modal>      
      }
      <p className='copyright'>Copyright 2024  @Komi</p>
    </div>
  );
}

export default App;
