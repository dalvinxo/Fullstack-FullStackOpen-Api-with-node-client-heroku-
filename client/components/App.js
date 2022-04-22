import Blogs from './Blogs';

const App = () => {
	const mode = SERVER_MODE;
	console.log(mode);
	return (
		<div>
			<h1>Hello World </h1>
			<Blogs />
		</div>
	);
};

export default App;
