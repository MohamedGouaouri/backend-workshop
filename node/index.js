import axios, * as others from 'axios';

if (process.argv.length != 3) console.log('Usage')

const searchFor = process.argv[2]
axios.get('https').then(data => console.log(data.headers)).catch((err) => {console.log(err)})