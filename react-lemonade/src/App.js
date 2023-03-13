import "./App.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Card, Button, Table } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemonade";

  const fetchCocktail = useCallback(() => {
    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        const data = res.data.drinks.slice(0, 4);
        setData(data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  const addToCart = (item) => {
	if (item.idDrink in cart) {
	  setCart({ ...cart, [item.idDrink]: { ...cart[item.idDrink], quantity: cart[item.idDrink].quantity + 1 }});
	} else {
	  setCart({ ...cart, [item.idDrink]: { item: item, quantity: 1 }});
	}
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.idDrink.substring(0, 2)), 0);
  };

  if (loading) {
    return <p className="loadingtext">Loading...</p>;
  }

  return (
    <div className="App">

      <div className="jumbotron">
        <h1 className="display-3">Delicious lemonade</h1>
        <p className="lead">We got it!</p>
      </div>

      <div className="card-container">
        {data.map((cocktail) => (
          <Card key={cocktail.idDrink}>
            <Card.Img variant="top" src={cocktail.strDrinkThumb} alt="#" />
            <Card.Body>
              <Card.Title>{cocktail.strDrink}</Card.Title>
              <Card.Subtitle>{cocktail.strCategory}</Card.Subtitle>
              <Card.Text>{cocktail.idDrink.substring(0, 2)} kr.</Card.Text>
              <Button variant="primary" onClick={() => addToCart(cocktail)}>
                Add to cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

<h1>Your cart</h1>
	  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Drink</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(cart).map(({ item, quantity }) => (
      <tr key={item.idDrink}>
        <td>{item.strDrink}</td>
        <td>{quantity}</td>
        <td>{parseFloat(item.idDrink.substring(0, 2)).toFixed(2)} kr.</td>
      </tr>
    ))}
    <tr>
      <td colSpan="2">Total</td>
      <td>{Object.values(cart).reduce((total, { item, quantity }) => total + parseFloat(item.idDrink.substring(0, 2)) * quantity, 0).toFixed(2)} kr.</td>
    </tr>
  </tbody>
</Table>
    </div>
  );
}

export default App;
