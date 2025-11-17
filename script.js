import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.querySelector(".meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeModal);
memeModal.addEventListener("click", (e) => {
  if (e.target === memeModal) closeModal();
});

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function getEmotionsArray(cats) {
  const emotions = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotions.includes(emotion)) emotions.push(emotion);
    }
  }
  return emotions;
}

function renderEmotionsRadios(cats) {
  let html = "";
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    html += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" name="emotions" id="${emotion}" value="${emotion}" />
      </div>
    `;
  }
  emotionRadios.innerHTML = html;
}

function getMatchingCatsArray() {
  const selected = document.querySelector('input[type="radio"]:checked');
  if (!selected) return [];

  const emotion = selected.value;
  const isGif = gifsOnlyOption.checked;

  return catsData.filter((cat) => {
    return cat.emotionTags.includes(emotion) && (!isGif || cat.isGif);
  });
}

function getCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 0) return [];
  if (catsArray.length === 1) return [catsArray[0]];

  let r1 = Math.floor(Math.random() * catsArray.length);
  let r2;
  do {
    r2 = Math.floor(Math.random() * catsArray.length);
  } while (r2 === r1);

  return [catsArray[r1], catsArray[r2]];
}

function renderCat() {
  const catObject = getCatObject();
  if (catObject.length === 0) return alert("No cat matches this emotion!");

  if (catObject.length === 2) {
    memeModalInner.innerHTML = `
      <img class="cat-img" style="width:170px;height:210px;" src="./images/${catObject[0].image}" alt="${catObject[0].alt}" />
      <img class="cat-img" style="width:170px;height:210px;" src="./images/${catObject[1].image}" alt="${catObject[1].alt}" />
    `;
  } else {
    memeModalInner.innerHTML = `
      <img class="cat-img" style="width:340px;height:420px;" src="./images/${catObject[0].image}" alt="${catObject[0].alt}" />
    `;
  }

  memeModal.style.display = "flex";
}
renderEmotionsRadios(catsData);
