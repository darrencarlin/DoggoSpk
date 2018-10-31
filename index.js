document.getElementById("convert").addEventListener("click", evt => {
  evt.preventDefault();
  let text = document.getElementById("text").value;
  newText = text.replace("i hurt myself", "i did a hurt");
  //let arr = text.split(/,?\s+/);
  document.getElementById("output").innerHTML = newText;
});

// two options to check, single words = array, sentences = complete string
