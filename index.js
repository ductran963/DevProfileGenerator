const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');

function createPDF () {
  var html = fs.readFileSync('./index.html', 'utf8');
  var options = { format: 'Letter' };

  pdf.create(html, options).toFile('./index.pdf', function (err) {
    if (err) return console.log(err);
    console.log("Successfully converting hml to pdf");
  });
}


const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {

  return inquirer.prompt([
    {
      message: "Enter your GitHub username:",
      name: "username",
    },
    {
      message: "What is your favorite color?",
      name: "color"
    }
  ])
}

function apiCall(data) {
  const queryUrl = `https://api.github.com/users/${data.username}`;

  return axios.get(queryUrl).then(res => {
    return res.data
    // .then(function (res) {
    //   console.log(res.data);


    // });
});
}



const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data, apiData, ) {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         height: 226px;
         top: -103px;
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 12px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         position: relative;
         bottom: 11px;
         }
         .photo-header h1 {
         margin-top: -37px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 21px 33px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 46px;
           
         }

         .bio {
          padding-left: 83px;
          font-size: 22px;
         }
         
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
      </head>
      <body>
        <div class="wrapper">
        <div class="container">
          <div class="photo-header img">
          <img src = "${apiData.avatar_url}" alt="profile image">
          </div>
          <div class = "photo-header">
            <h2>Hello!</h2>
            <h3>My Github Username is ${apiData.login}</h3>
            <div class = "links-nav">
            <a href="https://www.google.com/maps/place/San+Diego,+CA/@32.8242404,-117.389167,10z/data=!3m1!4b1!4m5!3m4!1s0x80d9530fad921e4b:0xd3a21fdfd15df79!8m2!3d32.715738!4d-117.1610838" target="_blank">San Diego</a>
            </div>
            <div class = "nav-link">
            <a href="https://github.com/ductran963" target="_blank">Github Profile</a>
            </div>
            <div class = "nav-link">
            <a href="${apiData.blog}" target="_blank">Blog</a>
            </div>
          
          </div>
          <div class = "bio">
          <p>${apiData.bio}</p>
          </div>
          <div class="row">
              <div class="col-md-6">
                <div class = "card">
                <h2>Public Repository</h2>
                <h3>${apiData.public_repos}</h3>
                </div>
              </div>
              <div class="col-md-6">
                  <div class = "card">
                  <h2>Followers</h2>
                  <h3>${apiData.followers}</h3>
                  </div>
              </div>
        </div>
        <div class="row">
            <div class="col-md-6">
              <div class = "card">
                <h2>Github Stars</h2>
                <h3>${apiData.public_gists}</h3>
              </div>
            </div>
            <div class="col-md-6">
                <div class = "card">
                <h2>Following</h2>
                <h3>${apiData.following}</h3>

                </div>
            </div>
      </div>
      </div>
      </body>
      </html>`

}

async function init() {
  try {
    const data = await promptUser();
    const apiData = await apiCall(data);
    
    const html = generateHTML(data, apiData);

    await writeFileAsync("index.html", html);
    
    createPDF();
    console.log("Created an index.html");
   
  } catch (err) {
    console.log(err);
  }
}

init();

