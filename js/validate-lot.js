// const BASE_URL = `http://localhost:3000/api`;
const BASE_URL = `https://clia-backend.herokuapp.com/api`;

const checkLotExpired = date => {
  const lotDate = new Date(date);
  const today = new Date();
  if (lotDate > today) {
    return false;
  } else {
    const isToday = lotDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    if (isToday) {
      return false;
    } else {
      return true;
    }
  }
};

const validateLotNumber = async () => {
  let loadBtn = document.querySelector(".loader-btn");
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  loadBtn.disabled = true;
  let toast = document.getElementById("toast");
  const inputLotNumber = document.getElementById("lot-number").value;

  const response = await fetch(`${BASE_URL}/lot/${inputLotNumber}`);
  if (response.status === 200) {
    const data = await response.json(); //extract JSON from the http response

    const lotExpired = checkLotExpired(data.lot.expirationdate);

    if (lotExpired) {
      toast.innerHTML = "LOT EXPIRED";
	  toast.style.color = "red";
    } else {
      toast.innerHTML = "VALID LOT";
	  toast.style.color = "green";
    }

    toast.style.visibility = "visible";
    

    setTimeout(function () {
      toast.style.visibility = "hidden";
    }, 3000);
    loader.style.display = "none";
    loadBtn.disabled = false;
  } else {
    toast.innerHTML = "NETWORK API ERROR";
    if (response.status === 404) {
      toast.innerHTML = "INVALID LOT";
    }
    // ERROR
    toast.style.visibility = "visible";
    toast.style.color = "red";

    setTimeout(function () {
      toast.style.visibility = "hidden";
    }, 3000);
    loader.style.display = "none";
    loadBtn.disabled = false;
  }
};
