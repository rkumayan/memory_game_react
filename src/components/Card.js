import './card.css'
const Card = ( {card , handleChoice , flipped}) => {
    const handleClick = () =>{
        handleChoice( card );
    }
    
    return (  
        <div className="card" >
            <div className = { flipped ? "flipped" : ""}>
                {/* FRONT */}            
                <img className = "front"
                 src={card.src} alt = "card front"              
                />

                {/* BACK */}
                <img
                 className = "back" 
                 src= "/img/cover.png" alt="card back" 
                 onClick={handleClick}
                />
            </div>            
          </div>
    );
}
 
export default Card;