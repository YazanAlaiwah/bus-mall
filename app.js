'use strict';
// array of the name of images
console.log(document.URL);
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
var imgsIndex = [];
var rounds = 0;
var left;
var ceneter;
var right;
// have the images elemnt from the HTML file by id
var leftImage = document.querySelector('#img-left');
var rightImage = document.querySelector('#img-right');
var ceneterImage = document.querySelector('#img-ceneter');
var resulte = document.querySelector('#resulte');
var names;
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
names = imagesObj.map(a => a.name);

function randomImages() {
  // assaien the images object in varibels
  /////////////////////////////
  for (let index = 0; index < 3; index++) {
    var i = getRndInteger(0, images.length - 1);
    while (imgsIndex.includes(i)) {
      i = getRndInteger(0, images.length - 1);
    }
    imgsIndex.push(i);
  }
  if (imgsIndex.length > 3) {
    imgsIndex.splice(0, 3);
  } // alert('jlkj')
  //////////////////////////////
  left = imagesObj[imgsIndex[0]];
  ceneter = imagesObj[imgsIndex[1]];
  right = imagesObj[imgsIndex[2]];
  // check if there images looks same if yes will reassaien the images
  // while (
  //   left.name === ceneter.name ||
  //   left.name === right.name ||
  //   ceneter.name === right.name
  // ) {
  //   left = imagesObj[getRndInteger(0, images.length - 1)];
  //   ceneter = imagesObj[getRndInteger(0, images.length - 1)];
  //   right = imagesObj[getRndInteger(0, images.length - 1)];
  // }
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
    var main = document.getElementById('main');
    main.style.display = 'none';
    ///////////////
    var votes = [];
    var viwes = [];
    imagesObj.forEach(a => {
      votes.push(a.clicks);
      viwes.push(a.viwe);
    });
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
            data: viwes,
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

    //////////////

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
// window.location.href = "resulte.html";

// console.log(myChart);
