import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Vegan Caesar Salad",
    description: "Creamy and Delicious!",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Cucumber-Melon Soup",
    description: "Cool and Healthy!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Vegan Chocolate Chip Cookies",
    description: "Perfect for a Sweet tooth!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Mushroom-Quinoa Burger",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
