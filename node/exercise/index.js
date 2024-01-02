import axios from 'axios';

// TODO: Pring usage message
if (process.argv.length != 3) console.log('Usage')

const searchFor = process.argv[2]
axios
    // TODO: Extract the url into env variable
    .get(`https://icanhazdadjoke.com/search?term=${searchFor}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .then(data => {
        // TODO: Get result
        // TODO: Check for joke existence
        // TODO: Write jokes to file
    })
    .catch((err) => {console.log(err)})