const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://neeraj13031998:734Hw3bDvTJLNAqr@cluster0.0njduhw.mongodb.net/?retryWrites=true&w=majority';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
// neeraj13031998
// 734Hw3bDvTJLNAqr
//mongodb+srv://neeraj13031998:<password>@cluster0.0njduhw.mongodb.net/?retryWrites=true&w=majority
mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});