const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const photos = ['../wa3Assets/Golden_retriever1.webp', '../img/Red-blue_sunset.jpeg' , '../img/girlWithFlowers.jpeg', '../img/flowers.webp', '../wa3Assets/mayorMax_golden.webp'];
/* Declaring the alternative text for each image file */
const photosAlt = ['Golden Retriever', 'Sunset', 'girl with flowers' , 'flowers', 'Mayor Max'];
/* Looping through images */
for (let x = 0; x < photos.length; x++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', photos[x]);
    newImage.setAttribute('alt', photosAlt[x]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', () => {
      displayedImage.src = newImage.src;
      displayedImage.alt = newImage.alt;
    });
  }

// const newImage = document.createElement('img');
// newImage.setAttribute('src', xxx);
// newImage.setAttribute('alt', xxx);
// thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    if(btn.getAttribute('class') === 'Dark')
    {
        btn.setAttribute("class", 'Light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';

    }
    else{
        btn.setAttribute("class", 'Dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(255,255,255, 0.5)';        
    }
});