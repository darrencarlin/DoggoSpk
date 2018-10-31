const words = {
  help: "halp",
  me: "me",
  attention: "attenchon",
  stop: "staph",
  that: "dat",
  thats: "dats",
  this: "dis",
  fuck: "furk",
  fuckery: "furkery",
  brother: "brofur",
  brothers: "brofurs",
  sister: "sisfur",
  sisters: "sisfurs",
  parent: "pawrent",
  parents: "pawrents",
  paws: "stumps",
  with: "wid",
  please: "peez",
  look: "lewk",
  give: "gib",
  teeth: "teef",
  think: "tink",
  you: "u",
  need: "ned",
  to: "2",
  its: "is",
  human: "hooman"
};

const submitBtn = document.getElementById("submit");
const textArea = document.getElementById("textarea");
const clearBtn = document.getElementById("clear");
const hashtagBtn = document.getElementById("convertToHash");

textArea.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    convertText(event);
  }
});

submitBtn.addEventListener("click", event => {
  convertText(event);
});

hashtagBtn.addEventListener("click", event => {
  convertHashtag(event);
});

let hashtagArr = [];

function convertHashtag(event) {
  event.preventDefault();
  document.getElementById("outputform").innerHTML = "";
  hashtagArr.forEach(element => {
    document.getElementById("outputform").innerHTML += `#${element}`;
  });
}

function convertText(event) {
  event.preventDefault();

  let text = document.getElementById("textarea").value.toLowerCase();
  let arr = text.split(/,?\s+/);

  arr.forEach(element => {
    let output = words[element];
    if (output === undefined) {
      document.getElementById("outputform").innerHTML += "Word Not Found";
    } else {
      document.getElementById("outputform").innerHTML += `${output} `;
      hashtagArr.push(output);
    }
  });
}

clearBtn.addEventListener("click", event => {
  event.preventDefault();
  document.getElementById("textarea").innerHTML = "";
  document.getElementById("outputform").innerHTML = "";
});

// Allowed words (words that dont have a translation)
