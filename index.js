const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//const apiUrl = "https://api.lyrics.ovh/v1/";
var request = require('request');
//const songsRoutes = require('./handlers/songs.js');

//app.use('/songs', songsRoutes);

// Import libs
app.use(bodyParser.json());


// const fecthData = url => {
//     return new Promise( (resolve, reject) => {
//       axios.get(apiUrl + url)
//       .then( response => {
//         //console.log(response);
//           return response.status == 200
//           ? response
//           : reject('Fetch error first then', response);
//       })
//       .then( data => {
//           return resolve(JSON.stringify(data.data));
//       })
//       .catch( fetchError => {
//           return reject(fetchError);
//       });
//     });
// };

app.get('/',async(req,res)=>{

request('https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime', function (error, response, body) {
  // console.log('Status:', response.statusCode);
  // console.log('Headers:', JSON.stringify(response.headers));
  // console.log('Response:', body);
  res.json(body);
});
  // try {
  //       await fecthData("Coldplay/Adventure of a Lifetime")
  //       .then( data => res.json(data))
  //       .catch( err => res.json(err))
  // }catch(e){
  //   res.json(e);
  // }
});



// Run app
app.listen(port,()=>{
  console.log(`Exemple app listening at http://localhost:${port}`);
})
