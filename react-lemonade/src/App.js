import './App.css';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
	const [loading,setLoading] = useState(false);
	const [data,setData] = useState([]);


	const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemonade';

	const fetchCocktail = useCallback(()=> {
		setLoading(true);

		axios.get(url)
		.then(res => {
		  const data = res.data.drinks.slice(0, 4);
		  setData(data);
		})
		.catch(e => console.log(e))
		.finally(() => setLoading(false));
	}, []);
  
	useEffect(() => {
	  fetchCocktail();
	}, [fetchCocktail]);
  
	if (loading) {
	  return <p class="loadingtext">Loading...</p>;
	}
  
	return (
		<div className="App">

	<Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Drinks with a G</Navbar.Brand>
          <Nav className="ms-auto">
			<Button variant="primary">Cart</Button>
          </Nav>
    </Navbar>

	<div class="jumbotron">
		<h1 class="display-3">Delicious lemonade?</h1>
		<p class="lead">We got it!</p>
		<button class="btn btn-primary btn-lg">Learn More</button>
	</div>
			<div className="card-container">
		  {data.map(cocktail => (
			<Card key={cocktail.idDrink}>
			  <Card.Img variant="top" src={cocktail.strDrinkThumb} alt="#" />
			  <Card.Body>
				<Card.Title>{cocktail.strDrink}</Card.Title>
				<Card.Subtitle>{cocktail.strCategory}</Card.Subtitle>
				<Card.Text>{cocktail.idDrink.substring(0, 2)} kr.</Card.Text>
				<Button variant="primary">Add to cart</Button>
			  </Card.Body>
			</Card>
		  ))}
		</div>
	  </div>
	);
  }
  
  export default App;
