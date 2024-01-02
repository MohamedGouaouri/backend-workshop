import axios from 'axios';

if (process.argv.length != 3) console.log('Usage')

const searchFor = process.argv[2]
axios
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