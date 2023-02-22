$(document).ready(function () {

  // Show the file manager dialog and wait for a file to be selected
  const input = $("<input type='file'>");
  input.on("change", function () {
    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = event => {
      $("#photo").attr("src", event.target.result);
    };
    reader.readAsDataURL(input[0].files[0]);
  });

  // Attach a click event handler to the photo and change__photo elements
  $(".photo__container").click(() => {
    input.click();
  });
  $(".change__photo").click(() => {
    input.click();
  });

  // Add a click event listener to the "Видалити" button using event delegation
  $(document).on("click", ".del__photo", () => {
    // Remove the photo from local storage
    localStorage.removeItem("photo");

    // Remove the photo from the page
    $("#photo").attr("src", "./img/img-Girl.svg");
  });


  // click on the button with class "save__btn"
  $(".save__btn").click(() => {


    // check all required fields
    if (
      $("#fname").val() === "" ||
      $("#lname").val() === "" ||
      $("#about").val() === "" ||
      $("#location").val() === "" ||
      $("#languages").val() === ""
    ) {
      // Show the error message
      alert("Заповніть всі поля");
      return;
    }

    // Get user data from form
    const getUserData = () => {
      const userData = {
        id: new Date().getTime(), // add a unique id to each dataUser object
        photo: $("#photo").attr("src"),
        name: $("#fname").val(),
        surname: $("#lname").val(),
        about: $("#about").val(),
        location: $("#location").val(),
        languages: $("#languages").val(),
      };
      return userData;
    };

    // Get existing user data from local storage, or create an empty array if it doesn't exist
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

    // Get user data from form
    const userData = getUserData();

    // Add the new user data to the existing array of user data
    existingUserData.push(userData);

    // Save the updated array of user data to local storage
    localStorage.setItem("userData", JSON.stringify(existingUserData));

    // clear the form
    $("#fname").val("");
    $("#lname").val("");
    $("#about").val("");
    $("#location").val("");
    $("#languages").val("");

    // Show the success message
    alert("Дані успішно збережено");


    // show data from local storage on page
    if (localStorage.getItem("userData")) {
      const showUserData = JSON.parse(localStorage.getItem("userData"));
      if (showUserData.length > 0) {
        const lastUserData = showUserData[showUserData.length - 1];
        $("#photo").attr("src", lastUserData.photo);
        $("#fname").val(lastUserData.name);
        $("#lname").val(lastUserData.surname);
        $("#about").val(lastUserData.about);
        $("#location").val(lastUserData.location);
        $("#languages").val(lastUserData.languages);
      }
    }
  });

  // Inner function to show user data into Html code
  const showUserData = () => {
    // Get user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));


    // Clear the user data container
    $(".user__data").html("");

    // Loop through the user data and add it to the user data container
    userData.forEach((data) => {
      $(".user__data").append(`
      <div class="user__data__item d-flex">
        <div class="user__data__item__photo me-4">
          <img src="${data.photo}" alt="photo">
        </div>
        <div class="user__data__item__info">
          <div class="user__data__item__info__name">
          <h3>Ім'я та прізвище: <span>${data.name}</span>
            <span>${data.surname}</span></h3>
          </div>  
          <div class="user__data__item__info__about">
          <h3>Про мене: <span>${data.about}</span></h3>
          </div>
          <div class="user__data__item__info__location">
          <h3>Локація: <span>${data.location}</span></h3>
          </div>
          <div class="user__data__item__info__languages">
          <h3>Мови спілкування: <span>${data.languages}</span></h3>
         
          </div>
                  </div>       
      </div>
      <hr>
    `);
    });
  };
  // Call the function to show user data
  showUserData();


});


