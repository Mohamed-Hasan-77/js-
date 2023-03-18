// toggle the side menu
document.querySelector(".bars-span").onclick = function () {
  document.querySelector(".side-menu").classList.toggle("toggle");
};
// ---------------------------------------------------------------------------------
// contact appearance
let contactSection = document.querySelector(".contact");
let contactBtn = document.querySelector("#contact-us");
let mainSec = document.querySelector(".main-screen");
let form = document.querySelector("form");
contactBtn.onclick = function () {
  mainSec.style.cssText = "display:none";
  searchSection.style.cssText = "display:none";
  foodDetails.style.cssText = "display:none";
  categoriesSection.style.cssText = "display:none";
  contactSection.style.cssText = "display:flex";
  form.style.cssText = "display:flex";
};
// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// search appearance
let searchSection = document.querySelector(".search");
let seacrhBtn = document.querySelector("#Search");
let searchInput = document.getElementById("search-name");
let searchInputByFirstL = document.getElementById("search-fl");
let theMeals = document.querySelector(".meals");
seacrhBtn.onclick = function () {
  contactSection.style.cssText = "display:none";
  mainSec.style.cssText = "display:none";
  foodDetails.style.cssText = "display:none";
  categoriesSection.style.cssText = "display:none";
  searchSection.style.cssText = "display:flex";
};
// categories appearance
let categoriesSection = document.querySelector(".categories");
let categoriesBtn = document.querySelector("#Categories");
categoriesBtn.onclick = function () {
  contactSection.style.cssText = "display:none";
  mainSec.style.cssText = "display:none";
  foodDetails.style.cssText = "display:none";
  searchSection.style.cssText = "display:none";
  categoriesSection.style.cssText = "display:block";
};
// -----------------------------search by name function ---------------------------------------
function searchByName() {
  let searchInputTxt = searchInput.value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
  )
    .then((response) => {
      let myData = response.json();
      return myData;
    })
    .then((myData) => {
      myData.meals.length = 25;
      let storageRoom = "";
      if (myData.meals) {
        myData.meals.forEach((meal, index) => {
          storageRoom += `
                    <div class="food-big-box col-md-3 col-12">
                    <div class="food-box rounded m-md-2" onclick="getFood(${index}, ${meal.idMeal})">
                            <img class="img-fluid rounded-top" src="${meal.strMealThumb}" alt="">
                            <div class="overlay rounded"> ${meal.strMeal}</div>
                    </div>
                    </div> 
                `;
        });
      } else {
        storageRoom = "Sorry, we didn't find any meal!";
      }
      theMeals.innerHTML = storageRoom;
    });
}
searchInput.onkeyup = function () {
  return searchByName();
};

// ----------------------------search by first letter -----------------------------
function searchByFirstletter() {
  let searchInputTxt = searchInputByFirstL.value;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputTxt}`
  )
    .then((response) => {
      let myData = response.json();
      return myData;
    })
    .then((myData) => {
      myData.meals.length = 25;
      let storageRoom = "";
      if (myData.meals) {
        myData.meals.forEach((meal, index) => {
          storageRoom += `
                    <div class="food-big-box col-md-3 col-12">
                    <div class="food-box rounded m-md-2" onclick="getFood(${index}, ${meal.idMeal})">
                            <img class="img-fluid rounded-top" src="${meal.strMealThumb}" alt="">
                            <div class="overlay rounded"> ${meal.strMeal}</div>
                    </div>
                    </div> 
                `;
        });
      } else {
        storageRoom = "Sorry, we didn't find any meal!";
      }
      theMeals.innerHTML = storageRoom;
    });
}
searchInputByFirstL.onkeyup = function () {
  searchInputByFirstL.value = searchInputByFirstL.value.slice(0, 1);
  return searchByFirstletter();
};

// -----------------------------------validate Form----------------------------------------------
let myName = document.getElementById("name");
let phone = document.querySelector("#phone");
let pass = document.querySelector("#pass");
let email = document.querySelector("#email");
let age = document.querySelector("#age");
let repass = document.querySelector("#repass");

let test1 = "";
let test2 = "";
let test3 = "";
let test4 = "";
let test5 = "";
let test6 = "";
// validate name
myName.onkeyup = function () {
  test1 = /^[a-z ,.'-]+$/i.test(myName.value);
};
// validate phone
phone.onkeyup = function () {
  test2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phone.value
  );
  console.log("valTest: ", test2);
};
// validate pass
pass.onkeyup = function () {
  test3 = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(pass.value);
  console.log("valTest: ", test3);
};
// validate email
email.onkeyup = function () {
  test4 =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.value
    );
  console.log("valTest: ", test4);
};
// validate age
age.onkeyup = function () {
  test5 = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(age.value);
  console.log("valTest: ", test5);
};
// validate repass
repass.onkeyup = function () {
  if (repass.value == pass.value) {
    test6 = true;
    console.log("test6: ", test6);
  }
};
//  final validation
document.querySelector(".submit").onmouseover = function () {
  if (
    test1 == true &&
    test2 == true &&
    test3 == true &&
    test4 == true &&
    test5 == true &&
    test6 == true
  ) {
    document.querySelector(".submit").classList.add("submit-over");
  }
};

form.onsubmit = function () {
  if (
    test1 == true &&
    test2 == true &&
    test3 == true &&
    test4 == true &&
    test5 == true &&
    test6 == true
  ) {
    return true;
  } else {
    return false;
  }
};

// -------------------------------------main section--------------------------------------------
let mainScreenMeals = document.querySelector(".myfood");
function displayMeals() {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=c`)
    .then((response) => {
      let myData = response.json();
      return myData;
    })
    .then((myData) => {
      myData.meals.length = 25;
      let storageRoom = "";
      if (myData.meals) {
        myData.meals.forEach((meal, index) => {
          storageRoom += `
                <div class="food-big-box col-md-3 col-12">
                    <div class="food-box rounded m-md-2" onclick="getFood(${index}, ${meal.idMeal})">
                        <img class="img-fluid rounded-top" src="${meal.strMealThumb}" alt="">
                        <div class="overlay rounded"> ${meal.strMeal}</div>
                    </div>
                </div>
                `;
        });
      } else {
        storageRoom = "Sorry, we didn't find any meal!";
      }
      mainScreenMeals.innerHTML = storageRoom;
    });
}
displayMeals();

// --------------------------------------- meal details------------------------------------------------
let foodDetails = document.querySelector(".food-details");
let mealDeatailsInfo = document.querySelector(".inst-box");
function getFood(index, id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => {
      let apiResponse = response.json();
      return apiResponse;
    })
    .then((data) => {
      // get tags
      let tags = "";
      if (data.meals[0].strTags) {
        for (let i = 0; i < data.meals[0].strTags.split(",").length; i++) {
          tags += `
          </span> <span class="alert alert-danger m-2 p-1 fw-normal">${
            data.meals[0].strTags.split(",")[i]
          }</span>`;
        }
      }
      // display data
      mealDeatailsInfo.innerHTML = `
    <div class="img col-md-4 col-sm-12">
    <img class="img-fluid rounded" src="${data.meals[0].strMealThumb}" alt="">
    <p class="food-title">${data.meals[0].strMeal}</p>
  </div>
  <div class="instructions col-md-8 col-sm-12">
    <h2>Instructions</h2>
    <p class="inst">
        ${data.meals[0].strInstructions}
    </p>
    <div class="info">
        <ul class="fw-bolder ps-0">
            <li ><span>Area :</span> ${data.meals[0].strArea}</li>
            <li><span>Category :</span>${data.meals[0].strCategory}</li>
            <li><span>Recipes :</span>
                <ul  class="list-unstyled d-flex g-3 flex-wrap fw-normal">
                    <li class="alert alert-info m-2 p-1">1 pound penne rigate</li><li class="alert alert-info m-2 p-1">1/4 cup olive oil</li><li class="alert alert-info m-2 p-1">3 cloves garlic</li><li class="alert alert-info m-2 p-1">1 tin  chopped tomatoes</li><li class="alert alert-info m-2 p-1">1/2 teaspoon red chile flakes</li><li class="alert alert-info m-2 p-1">1/2 teaspoon italian seasoning</li><li class="alert alert-info m-2 p-1">6 leaves basil</li><li class="alert alert-info m-2 p-1">spinkling Parmigiano-Reggiano</li>
                </ul>
            </li>
            <li><span>Tags : ${tags} </li>
        </ul>
    <div class="links">
        <a class="btn btn-success" href="${data.meals[0].strSource}" target="_blank">Source</a>
        <a class="btn btn-danger" href="${data.meals[0].strYoutube}" target="_blank">Youtube</a>
    </div>
    </div>
  </div>`;
    });
  foodDetails.style.cssText = "display:block";
  mainSec.style.cssText = "display:none";
  searchSection.style.cssText = "display:none";
  contactSection.style.cssText = "display:none";
  categoriesSection.style.cssText = "dispaly:none";
}

// --------------------------------------- categories ------------------------------------------------
// let foodcategory = document.querySelector(".food-category");
// function getCategory() {
//   fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
//     .then((response) => {
//       let apiResponse = response.json();
//       return apiResponse;
//     })
//     .then((data) => {
//       console.log(data.categories);
//       let storageRoom = "";
//       if (data) {
//         data.categories.forEach((category) => {
//           storageRoom += `
//           <div class="category-big-box col-md-3 col-12">
//           <div class="category-box rounded m-md-2" onclick ="categorySearchAppear(${
//             category.strCategory
//           })">
//               <img class="img-fluid rounded-top" src="${
//                 category.strCategoryThumb
//               }" alt="">
//               <div class="overlay rounded">${
//                 category.strCategory
//               } <p class="text-center">${category.strCategoryDescription.slice(
//             0,
//             150
//           )}...</p> </div>
//           </div>
//       </div>
//                 `;
//         });
//       } else {
//         storageRoom = "No Categories";
//       }
//       foodcategory.innerHTML = storageRoom;
//     });
// }
// getCategory();

// // ---------------- Filter by Category
// let categorySearch = document.querySelector(".categorySearch");
// function categorySearchAppear(CatName) {
//   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CatName}`)
//     .then((response) => {
//       let apiResponse = response.json();
//       return apiResponse;
//     })
//     .then((myData) => {
//       console.log(myData);
//       // let storageRoom = "";
//       // if (myData.meals) {
//       //   myData.meals.forEach((meal, index) => {
//       //     storageRoom += `
//       //     <div class="categoryS-big-box col-md-3 col-12">
//       //     <div class="categoryS-box rounded m-md-2">
//       //             <img class="img-fluid rounded-top" src="" alt="">
//       //             <div class="overlay rounded">food</div>
//       //     </div>
//       //     </div>
//       //           `;
//       //   });
//       // } else {
//       //   storageRoom = "Sorry, we didn't find any meal!";
//       // }
//       // mainScreenMeals.innerHTML = storageRoom;
//     });
//   // foodDetails.style.cssText = "display:block";
//   // mainSec.style.cssText = "display:none";
//   // searchSection.style.cssText = "display:none";
//   // contactSection.style.cssText = "display:none";
// }
// function FilterCategory() {}
