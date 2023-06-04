import style from './Paginado.module.css'


const Paginado = ({ pokemonPerPage, pokemons, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div >
        <ul className={style.ulContainer}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <a onClick={()=>paginado(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default Paginado;