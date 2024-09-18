import express from 'express';

const app = express(); // create app

//listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
}
);
// install nodemon - to save changes instantly