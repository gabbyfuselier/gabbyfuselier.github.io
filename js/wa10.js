const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Dracula", "The Easter Bunny", "Santa Claus"]
let insertY = ["CU Boulder", "the Amazon", "the Eiffel tower"]
let insertZ = ["flew away", "caught fire", "turned into a kangaroo and jumped away"]


randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    newStory = newStory.replaceAll(":insertz:", zItem);


    if(customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replaceAll("Bob", name);
    }
  
    if(document.getElementById("uk").checked) {
      const weight = Math.round(300/14) + " stones";
      const temperature =  Math.round((94-32) * (5/9)) + " celsius";

      newStory = newStory.replaceAll("94 fahrenheit", temperature);
      newStory = newStory.replaceAll("300 pounds", weight);
    }
  
    story.textContent = newStory;
    story.style.visibility = 'visible';
  }