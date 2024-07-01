import { useEffect, useState } from "react";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
}

const App = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [select, setSelect] = useState<String>("All");

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        const drinksData = data.drinks as Drink[];

        setDrinks(drinksData);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-center py-10">
        Data Fetching in React
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => setSelect("Cocktail")}
          className=" bg-blue-400 text-white text-lg rounded-lg px-5 py-2"
        >
          Cocktail
        </button>
        <button
          onClick={() => setSelect("Ordinary Drink")}
          className=" bg-blue-400 text-white text-lg rounded-lg px-5 py-2"
        >
          Ordinary Drink
        </button>
        <button
          onClick={() => setSelect("All")}
          className=" bg-blue-400 text-white text-lg rounded-lg px-5 py-2"
        >
          All
        </button>
      </div>
      <ul className="px-10">
        {drinks
          .filter((drink) => select === "All" || drink.strCategory === select)
          .map((drink) => (
            <div key={drink.idDrink} className="flex flex-col py-5">
              <h1 className="text-xl py-2">{drink.strDrink}</h1>
              <img
                src={drink.strDrinkThumb}
                className="rounded-xl"
                width="284"
                height="284"
                alt={drink.strDrink}
              />
              <p>{drink.strCategory}</p>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default App;
