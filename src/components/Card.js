import './card.css'
const Card = ( {card , handleChoice}) => {
    const handleClick = () =>{
        handleChoice( card );
    }
    let style1 = { "display" : "none"};
    let style2 = { "display" : "block"};
    return (  
        <div className="card" >
            {/* front */}
            <img className = "front"
             src={card.src} alt = "card front" 
             style = { card.matched ? style2 : style1}
            />
            
            {/* back */}
            <img
             className = "back" 
             src= "/img/cover.png" alt="card back" 
             onClick={handleClick}
             style = { card.matched ? style1: style2}
            />
          </div>
    );
}
 
export default Card;