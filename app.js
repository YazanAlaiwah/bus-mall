'use strict';
// array of the name of images

var images = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
// all global vars
///////////////////////////////////////////////////////////

var imagesObj = [];
var imgsIndex = [];
var rounds = 0;
var left;
var ceneter;
var right;
// have the images elemnt from the HTML file by id
var leftImage = document.querySelector('#img-left');
var rightImage = document.querySelector('#img-right');
var ceneterImage = document.querySelector('#img-ceneter');
var names = [];
var votes = [];
var views = [];

//////////////////////////////////////////////////////////////////////////////////

// to check if the user have the needit local storge
///////////////////////////////////////////////////////////////////////////////////

if (localStorage.getItem('votes')) {
  votes = JSON.parse(localStorage.getItem('votes'));
  views = JSON.parse(localStorage.getItem('views'));
}

/////////////////////////////////////////////////////////////////////////////////////////

// Object Constructors for the images
/////////////////////////////////////////////////////////////////////////////////////

function Image(img) {
  this.name = img.split('.')[0];
  this.url = `img/${img}`;
  this.clicks = 0;
  this.viwe = 0;
  // to let the object push its self to the imagesObj array and store it there to be more daynamic
  imagesObj.push(this);
}

///////////////////////////////////////////////////////////////////////////////////////

// to have random numbers for the images
///////////////////////////////////////////////////////////////////////////////////

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

////////////////////////////////////////////////////////////

// to store all the images in the array and the name in array for names
/////////////////////////////////////////////////////////////////////

for (let index = 0; index < images.length; index++) {
  names.push(new Image(images[index]).name);
}

////////////////////////////////////////////////////////////////////////



// to have random images and display it
///////////////////////////////////////////////////////////////////////

function randomImages() {
  // assaien the images object in arrray
  /////////////////////////////
  for (let index = 0; index < 3; index++) {
    var i = getRndInteger(0, images.length - 1);
    while (imgsIndex.includes(i)) {
      i = getRndInteger(0, images.length - 1);
    }
    imgsIndex.push(i);
  }
  // check if there old images to remove
  if (imgsIndex.length > 3) {
    imgsIndex.splice(0, 3);
  }
  //////////////////////////////
  left = imagesObj[imgsIndex[0]];
  ceneter = imagesObj[imgsIndex[1]];
  right = imagesObj[imgsIndex[2]];
  left.viwe++;
  right.viwe++;
  ceneter.viwe++;
  leftImage.src = left.url;
  leftImage.alt = left.name;
  rightImage.src = right.url;
  rightImage.alt = right.name;
  ceneterImage.src = ceneter.url;
  ceneterImage.alt = ceneter.name;
}
randomImages();

///////////////////////////////////////////////////////////////////////////////////////


// funcito will called when user click an image
///////////////////////////////////////////////////////////////////////////////////////

function userClick(e) {
  // if statment to check if the user had 25 rounds if yes will delete the event and display the
  // reuslte as unoreder list
  if (rounds === 25) {
    diagram();

    //////////////

    imgs.removeEventListener('click', userClick);
  }
  // for to check what the user clicke and vote it to rise the vote of it and sum the round by 1
  for (let index = 0; index < imagesObj.length; index++) {
    if (imagesObj[index].name === e.target.alt) {
      imagesObj[index].clicks++;
      break;
    }
  }
  rounds++;
  randomImages();
}

//////////////////////////////////////////////////////////////////////////////////////////////


// event listener to the images will call userClick function
/////////////////////////////////////////////////////////////////////////////////////////////

var imgs = document.querySelector('#all-imgs');
imgs.addEventListener('click', userClick);


// this fuction will called when the user have 25 rounds by randomImages function
///////////////////////////////////////////////////////////////////////////////////

function diagram() {
  var main = document.getElementById('main');
  main.style.display = 'none';
  ///////////////
  imagesObj.forEach((element, index) => {
    votes[index] = element.clicks + (votes[index] || 0);
    views[index] = element.viwe + (views[index] || 0);
  });
  
  localStorage.setItem('votes' ,JSON.stringify(votes));
  localStorage.setItem('views',JSON.stringify(views));
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: ' Votes',
          data: votes,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',

          borderWidth: 1
        },
        {
          label: 'Viawes',
          data: views,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',

          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  ctx.style.height = '480px';
  ctx.style.width = '90%';
  ctx.style.display = 'block';
  ctx.style.margin = '5px 5%';
}
///////////////////////////////////////////////////////////////////////////////////////

// Thank You