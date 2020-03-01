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

var imagesObj = [];
var rounds = 0;
var left;
var ceneter;
var right;
// have the images elemnt from the HTML file by id
var leftImage = document.querySelector('#img-left');
var rightImage = document.querySelector('#img-right');
var ceneterImage = document.querySelector('#img-ceneter');
var resulte = document.querySelector('#resulte');
// Object Constructors for the images
function Image(img) {
  this.name = img.split('.')[0];
  this.url = `img/${img}`;
  this.clicks = 0;
  this.viwe = 0;
  // to let the object push its self to the imagesObj array and store it there to be more daynamic
  imagesObj.push(this);
}

// to have random numbers for the images
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// to store all the images in the array
for (let index = 0; index < images.length; index++) {
  new Image(images[index]);
}

function randomImages() {
  // assaien the images object in varibels
  left = imagesObj[getRndInteger(0, images.length - 1)];
  ceneter = imagesObj[getRndInteger(0, images.length - 1)];
  right = imagesObj[getRndInteger(0, images.length - 1)];
  // check if there images looks same if yes will reassaien the images
  while (
    left.name === ceneter.name ||
    left.name === right.name ||
    ceneter.name === right.name
  ) {
    left = imagesObj[getRndInteger(0, images.length - 1)];

    ceneter = imagesObj[getRndInteger(0, images.length - 1)];
    right = imagesObj[getRndInteger(0, images.length - 1)];
  }
  // assaien the img elements in html page with the values its need and plus that its used
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
// funcito will called when user click an image
function userClick(e) {
  // if statment to check if the user had 25 rounds if yes will delete the event and display the
  // reuslte as unoreder list
  if (rounds === 25) {
    imgs.removeEventListener('click', userClick);
    console.log(resulte);
    for (let index = 0; index < imagesObj.length; index++) {
      var img = imagesObj[index];
      var li = document.createElement('li');
      var p = document.createElement('p');
      p.textContent = `${img.name} slicer had ${img.clicks} votes and was shown ${img.viwe} time`;
      li.appendChild(p);
      resulte.appendChild(li);
    }
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
// event listener to the images will call userClick function
var imgs = document.querySelector('#all-imgs');
imgs.addEventListener('click', userClick);
