import { Fragment, useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-movies-2e31c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const loadedmeals = [];
      const mealsData = await response.json();

      for (const key in mealsData) {
        loadedmeals.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
        });
      }

      setMeals(loadedmeals);
    } catch (error) {
      setError("Failed to get the Meals!");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  if (isLoading) {
    return (
      <Fragment>
        <div className={styles.backdrop}></div>
        <div className={styles.loading}></div>
      </Fragment>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <p>No meals found.</p>;

  if (error) {
    content = <p className={styles["error-text"]}>{error}</p>;
  }

  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
