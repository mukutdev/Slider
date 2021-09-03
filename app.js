const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const warningBox = document.getElementById('warning-text');
const search = document.getElementById('search');
const imgWrap = document.getElementById('images-wrapper ')

// selected image
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {

  if (search.value == '') {
    imgWrap.style.display = 'none';
    gallery.innerHTML = '';
    const noInputText = 'You have not entered anything.Please type something.' 

    alertMessage(noInputText);
  } else if (images.length === 0) {

    imgWrap.style.display = 'none';
    gallery.innerHTML = '';
    const noResult = 'No Images found'
    alertMessage(noResult);
  }
  else {
    imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  }
  

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
  
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  
  
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    element.classList.toggle('added');
    
  } else {
    element.classList.toggle('added');
    sliders.pop(img);
  }
}
var timer
const createSlider = () => {

  let alertMsg = 'Please enter atleast 2 images'
  // check slider image length
  if (sliders.length < 2) {
    alertMessage(alertMsg);
    setTimeout(() => {
      warningBox.style.display = 'none';
    }, 3000);
    return;
  }
   
     // crate slider previous next area
     sliderContainer.innerHTML = '';
     const prevNext = document.createElement('div');
     prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
     prevNext.innerHTML = ` 
     <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
     <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
     `;
   
     sliderContainer.appendChild(prevNext)
     document.querySelector('.main').style.display = 'block';
     // hide image aria
     imagesArea.style.display = 'none';
  let duration = document.getElementById('duration').value || 1000;
  
  if (duration < 0) {
    alert(`You have entered a negative value.So default value(1000ms) is automatically applied.`)
    let newTime = Math.abs(1000);
    sliderTime(newTime);
  } else {
    sliderTime(duration);
 }

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);

  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})

// slider change time function

const sliderTime = (duration) => {
   sliders.forEach(slide => {
       let item = document.createElement('div')
       item.className = "slider-item";
       item.innerHTML = `<img class="w-100"
       src="${slide}"
       alt="">`;
       sliderContainer.appendChild(item)
     })
     changeSlide(0)
     timer = setInterval(function () {
       slideIndex++;
       changeSlide(slideIndex);
     }, duration);
}

// alert message function

const alertMessage = (message) => {
  const msg = document.getElementById('alert-msg');
  warningBox.style.display = 'block';
        msg.innerText = message;
}