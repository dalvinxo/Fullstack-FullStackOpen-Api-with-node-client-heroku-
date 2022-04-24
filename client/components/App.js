import Blogs from './Blogs';

const App = () => {
	const mode = SERVER_MODE;
	console.log('impresionante');
	return (
		<div>
			<h1>Hello World </h1>
			<p>This in el client pasando</p>
			<h6>No entiendo que pasa pero porque</h6>
			<h3>hello culo bendecido</h3>
			<h2>nitido
				<span>Red</span>
			</h2>
			<Blogs />
		</div>
	);
};

export default App;
