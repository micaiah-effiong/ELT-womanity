const { toPng, toJpeg } = require("html-to-image");
const node = document.getElementById("canvasP");
const quote = document.querySelector("#quote");
const quotePre = document.querySelector("#quotePre");
const usersName = document.querySelector("#visName");
const visNamePre = document.querySelector("#visNamePre");
const lastname = document.querySelector("#lastname");
const downloadBtn = document.querySelector("#downloadBtn");
const generate = document.querySelector("#generate");
const file = document.getElementById("uploadFile");
const previewImg = document.getElementById("previewImg");
const proPics = document.getElementById("proPics");

file.onchange = async () => {
  // let text = await file.files[0].text();
  let reader = new FileReader();
  window._re = reader;
  reader.readAsDataURL(file.files[0]);

  reader.onloadend = () => {
    console.log("loadend", file.files[0]);
    proPics.style.backgroundImage = `url('${reader.result}')`;
    console.log("generating image");
    generateImage();
  };
};

// quote.oninput = () => {
//   quotePre.innerText = quote.value.trim();
// };

generate.onclick = (e) => {
  e.preventDefault();
  generateImage();
};

function generateImage() {
  const gVal = generate.value;
  generate.value = "Wait...";
  toPng(node)
    .then(function (dataUrl) {
      generate.value = gVal;
      return (previewImg.src = dataUrl);
    })
    .catch(function (error) {
      return console.error("oops, something went wrong!", error);
    });
}

usersName.oninput = () => {
  const names = usersName.value.trim().split(" ");
  lastname.textContent = names.pop();
  visNamePre.textContent = names.join(" ");
};

downloadBtn.onclick = (e) => {
  e.preventDefault();
  toPng(node)
    .then(function (dataUrl) {
      let a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${usersName.value}-womanity-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
