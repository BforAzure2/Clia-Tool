const isStreetEqual = street => {
  let inputStreet = document.getElementById("Street").value;
  return inputStreet.toLowerCase() === street.toLowerCase();
};
const isCityEqual = city => {
  let inputCity = document.getElementById("City").value;
  return inputCity.toLowerCase() === city.toLowerCase();
};

const isStateEqual = state => {
  let inputState = document.getElementById("State").value;
  return inputState.toLowerCase() === state.toLowerCase();
};
const isZipCodeEqual = zipCode => {
  let inputZipCode = document.getElementById("ZipCode").value;
  return inputZipCode.toLowerCase() === zipCode.toLowerCase();
};
const validateClianNumber = async () => {
  let toast = document.getElementById("toast");
  const inputClianNumber = document.getElementById("clia-number").value;
  const token =
    "140AB32B5A9F43AA86C7AA3B478AC40490B8A27E860F4910A2B89CE25CFA8931";
  const response = await fetch(
    `https://www.hipaaspace.com/api/clia/getcode?q=${inputClianNumber}&rt=json&token=${token}`
  );
  if (response.status === 200) {
    const cliaNumber = await response.json(); //extract JSON from the http response
    console.log(cliaNumber.CLIA[0]);
    if (
      cliaNumber.CLIA[0] &&
      Object.keys(cliaNumber.CLIA[0]).length === 0 &&
      Object.getPrototypeOf(cliaNumber.CLIA[0]) === Object.prototype
    ) {
      // invali clian Number
      toast.style.visibility = "visible";
      toast.style.color = "red";
      toast.innerHTML = "CLIA Number is not validated. Please contact our support.";
      setTimeout(function () {
        toast.style.visibility = "hidden";
      }, 3000);
    } else {
      // valid clian Number

      if (
        isStreetEqual(cliaNumber.CLIA[0].STREET) &&
        isCityEqual(cliaNumber.CLIA[0].CITY) &&
        isStateEqual(cliaNumber.CLIA[0].STATE) &&
        isZipCodeEqual(cliaNumber.CLIA[0].ZIP)
      ) {
        // valid address
        window.location.href = "./ValidationSuccess.html";
      } else {
        // invalid address
        toast.style.visibility = "visible";
        toast.style.color = "red";
        toast.innerHTML = "Address is not matched with CLIA number.Please contact our support.";
        setTimeout(function () {
          toast.style.visibility = "hidden";
        }, 3000);
      }
    }
  } else {
    // ERROR
    toast.style.visibility = "visible";
    toast.style.color = "red";
    toast.innerHTML = "NETWORK API ERROR";
    setTimeout(function () {
      toast.style.visibility = "hidden";
    }, 3000);
  }
};
