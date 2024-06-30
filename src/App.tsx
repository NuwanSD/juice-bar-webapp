import { useEffect, useState } from "react";

const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const App = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [drinks, setDrinks] = useState<Drink[]>([]);

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
      <ul className="px-10">
        {drinks.map((drink) => {
          return (
            <div key={drink.idDrink} className="flex flex-col">
              <h1 className=" text-xl py-5">{drink.strDrink}</h1>
              <img
                src={drink.strDrinkThumb}
                className=" rounded-xl"
                width="284"
                height="284"
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
