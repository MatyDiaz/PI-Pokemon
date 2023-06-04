import Card from "../Card/Card";
import style from './CardsContainer.module.css'


const CardsContainer = ({currentPokemons}) => {


  return (
    <div className={style.container}>

      {currentPokemons.map((el) => (
        <Card
          id={el.id}
          key={el.id}
          name={el.name}
          image={el.image}
          hp={el.hp}
          attack={el.attack}
          defense={el.defense}
          speed={el.speed}
          height={el.height}
          weight={el.weight}
          types={el.types}
          created={el.created}
        />
      ))}
    </div>
  );
};

export default CardsContainer;