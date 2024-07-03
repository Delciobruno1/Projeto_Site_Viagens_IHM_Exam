$(document).ready(() => {
	// Text messages
	let loginText = 'Por favor faça o login ou registre-se !!';
	let personalInfo = 'Insira suas informações pessoais';
	let educationalInfo = 'Insira suas informações educacionais';
	let experienceInfo = 'Insira suas informações de experiência';
	let thankyou = 'Obrigado por se juntar a nós.';
	let checkDetail = 'Verifique suas informações';

	$('.t-title').text(loginText);

	// Opens the Registration page
	$('.btn-sign-up').click(() => {
		$('.sign-in-form').hide();
		$('.t-title').text(personalInfo);

		$('.sign-up-form').show('clip', 990);

		// TODO : 1. Design a functionality in login and registration page so that user can able to change CSS dynamically.
		//completed
		$('.container-fluid').removeClass('bg-dark');
		$('.container-fluid').addClass('bg-primary');
	});

	// Opens the Login page
	$('.btn-sign-in').click(() => {
		$('.sign-in-form').show('clip', 990);
		$('.sign-up-form').hide();
		$('.t-title').text(loginText);

		// TODO : 1. Design a functionality in login and registration page so that user can able to change CSS dynamically.
		//completed
		$('.container-fluid').removeClass('bg-primary');
		$('.container-fluid').addClass('bg-dark');
	});

	//TODO : 4. Use JQuery Datepicker for filling information of date of birth.
	// completed
	$('#datepicker').datepicker();

	// TODO : 5. Create a login.json file which include necessary data/fields required for login.
	// completed
	let pe = $('.login-in-password-error');
	pe.hide();
	let loginPasswordError = false;

	$('.btn-login-sign-in').click(() => {
		$.ajaxSetup({ async: false });
		const loginEmail = $('#login-in-email');
		const loginEmailValue = loginEmail.val();

		const loginPassword = $('#login-in-password');
		const loginPasswordValue = loginPassword.val();

		let checkval = false;

		// TODO : 6. Authenticate user by reading JSON file using JQuery AJAX.
		// Completed
		$.ajax({
			url: 'login.json',
			dataType: 'json',
			success: function(data) {
				$.each(data, (index, value) => {
					if (value.email == loginEmailValue && value.password == loginPasswordValue) {
						checkval = true;
						$('.login-container').hide();
						$('.welcome-message').show();
						$('.heading').text('');
						$('.t-title').text('');
						$('.json-text').text(value.name);
						return false;
					}
				});

				if (checkval == true) {
					pe.hide();
					loginEmail.css('border', '2px solid #34F458');
					loginPassword.css('border', '2px solid #34F458');
				} else {
					pe.html('Invalid Email & Password');
					pe.show();
					loginEmail.css('border', '2px solid #F90A0A');
					loginPassword.css('border', '2px solid #F90A0A');
					usernameError = true;
				}
			}
		});
	});

	// TODO : 2.1. Registration page consist of three section consisting of personal information , educational information and work experience information.
	// Completed with Validations

	$('.username-error').hide();
	$('.sign-up-email-error').hide();
	$('.datepicker-error').hide();
	$('.sign-up-password-error').hide();
	$('.confirmPassword-error').hide();

	let usernameError = false;
	let signUpEmailError = false;
	let datepickerError = false;
	let signUpPasswordError = false;
	let confirmPasswordError = false;

	// Username Validate Conatiner 1
	function username() {
		const pattern = /^[a-zA-Z_][a-zA-Z_ ]*[a-zA-Z_]$/;
		const username = $('#username').val();
		if (pattern.test(username) && username !== '') {
			$('.username-error').hide();
			$('#username').css('border', '2px solid #34F458');
		} else {
			$('.username-error').html('Deve conter apenas caracteres');
			$('.username-error').show();
			$('#username').css('border', '2px solid #F90A0A');
			usernameError = true;
		}
	}

	// Sign Up Email Validate Container 1
	function signUpEmail() {
		const pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		const email = $('#sign-up-email').val();
		if (pattern.test(email) && email !== '') {
			$('.sign-up-email-error').hide();
			$('#sign-up-email').css('border', '2px solid #34F458');
		} else {
			$('.sign-up-email-error').html('E-mail Inválido ');
			$('.sign-up-email-error').show();
			$('#sign-up-email').css('border', '2px solid #F90A0A');
			signUpEmailError = true;
		}
	}

	// DatePicker Validate Container 1
	function datepicker() {
		const datepicker = $('#datepicker').val();
		if (datepicker !== '') {
			$('.datepicker-error').hide();
			$('#datepicker').css('border', '2px solid #34F458');
		} else {
			$('.datepicker-error').html('Data Inválida');
			$('.datepicker-error').show();
			$('#datepicker').css('border', '2px solid #F90A0A');
			datepickerError = true;
		}
	}

	// Sign up Password Validation Container 1
	function checkPassword() {
		const password_length = $('#sign-up-password').val().length;
		if (password_length < 5) {
			$('.sign-up-password-error').html('Atleast 5 Characters');
			$('.sign-up-password-error').show();
			$('#sign-up-password').css('border', '2px solid #F90A0A');
			signUpPasswordError = true;
		} else {
			$('.sign-up-password-error').hide();
			$('#sign-up-password').css('border', '2px solid #34F458');
		}
	}

	// Sign up Confirm Password Validation Container 1
	function confirmPassword() {
		const password = $('#sign-up-password').val();
		const retype_password = $('#confirmPassword').val();
		if (password === '') {
			$('.confirmPassword-error').html('Password cannot be Null');
			$('.confirmPassword-error').show();
			$('#confirmPassword').css('border', '2px solid #F90A0A');
			signUpPasswordError = true;
		} else if (password !== retype_password) {
			$('.confirmPassword-error').html('Passwords Did not Matched');
			$('.confirmPassword-error').show();
			$('#confirmPassword').css('border', '2px solid #F90A0A');
			confirmPasswordError = true;
		} else {
			$('.confirmPassword-error').hide();
			$('#confirmPassword').css('border', '2px solid #34F458');
		}
	}

	// TODO : 7. While registration of user all data must be store and local storage.
	// Personal Information
	// Completed

	$('.btn-1').click(function() {
		usernameError = false;
		signUpEmailError = false;
		datepickerError = false;
		signUpPasswordError = false;
		confirmPasswordError = false;

		username();
		signUpEmail();
		datepicker();
		checkPassword();
		confirmPassword();

		if (
			usernameError === false &&
			signUpEmailError === false &&
			datepickerError === false &&
			signUpPasswordError === false &&
			confirmPasswordError === false
		) {
			$('.sign-up-container-1').hide();
			$('.t-title').text(educationalInfo);
			$('.sign-up-container-2').show('clip', 950);

			// TODO : 3. There must be progress bar at the bottom of the page giving information of progress of registration page.

			let val = 0;
			let interval = setInterval(() => {
				val = val + 1;
				$('.progressbar').progressbar({
					value: val
				});
				if (val === 40) clearInterval(interval);
			}, 10);
			$('.ui-progressbar .ui-progressbar-value').addClass('bg-light');

			const username = $('#username').val();
			const email = $('#sign-up-email').val();
			const datepicker = $('#datepicker').val();
			const retype_password = $('#confirmPassword').val();

			localStorage.setItem('username', username);
			localStorage.setItem('email', email);
			localStorage.setItem('date', datepicker);
			localStorage.setItem('pass', retype_password);

			return true;
		} else {
			return false;
		}
	});

	$('.institution-error').hide();
	$('.degree-error').hide();
	$('.percentage-error').hide();
	$('.year-pass-error').hide();

	let institutionError = false;
	let degreeError = false;
	let percentageError = false;
	let yearPasssError = false;

	// institution Validate Conatiner 2
	function institution() {
		const pattern = /^[a-zA-Z]*$/;
		const institution = $('#institution').val();
		if (pattern.test(institution) && institution !== '') {
			$('.institution-error').hide();
			$('#institution').css('border', '2px solid #34F458');
		} else {
			$('.institution-error').html('Should contain only Characters');
			$('.institution-error').show();
			$('#institution').css('border', '2px solid #F90A0A');
			institutionError = true;
		}
	}

	// degree Validate Conatiner 2
	function degree() {
		const degree = $('#degree').val();
		if (degree !== '') {
			$('.degree-error').hide();
			$('#degree').css('border', '2px solid #34F458');
		} else {
			$('.degree-error').html('Please Select');
			$('.degree-error').show();
			$('#degree').css('border', '2px solid #F90A0A');
			degreeError = true;
		}
	}

	// percentage Validate Conatiner 2
	function percentage() {
		const percentage = $('#percentage').val();
		if (percentage !== '') {
			$('.percentage-error').hide();
			$('#percentage').css('border', '2px solid #34F458');
		} else {
			$('.percentage-error').html('');
			$('.percentage-error').show();
			$('#percentage').css('border', '2px solid #F90A0A');
			percentageError = true;
		}
	}

	// Year Passout Validate Conatiner 2
	function passout() {
		const passout = $('#year-pass').val();
		if (passout !== '' && !(passout.length !== 4)) {
			$('.year-pass-error').hide();
			$('#year-pass').css('border', '2px solid #34F458');
		} else {
			$('.year-pass-error').html('Should contain 4 digits');
			$('.year-pass-error').show();
			$('#year-pass').css('border', '2px solid #F90A0A');
			yearPasssError = true;
		}
	}

	// TODO : 7. While registration of user all data must be store and local storage.
	// Educational Information
	// Completed

	$('.btn-2').click(function() {
		institutionError = false;
		degreeError = false;
		percentageError = false;
		yearPasssError = false;

		institution();
		degree();
		percentage();
		passout();

		if (
			institutionError === false &&
			degreeError === false &&
			percentageError === false &&
			yearPasssError === false
		) {
			$('.sign-up-container-2').hide();
			$('.t-title').text(experienceInfo);

			$('.sign-up-container-3').show('clip', 990);

			// TODO : 3. There must be progress bar at the bottom of the page giving information of progress of registration page.

			let val = 40;
			let interval = setInterval(() => {
				val = val + 1;
				$('.progressbar').progressbar({
					value: val
				});
				if (val === 70) clearInterval(interval);
			}, 10);

			$('.ui-progressbar .ui-progressbar-value').removeClass('bg-danger');
			$('.ui-progressbar .ui-progressbar-value').addClass('bg-warning');

			const institution = $('#institution').val();
			const degree = $('#degree option:selected').text();
			const percentage = $('#percentage').val();
			const passout = $('#year-pass').val();

			localStorage.setItem('institution', institution);
			localStorage.setItem('degree', degree);
			localStorage.setItem('percentage', percentage);
			localStorage.setItem('passout', passout);

			return true;
		} else {
			return false;
		}
	});

	$('.employer-error').hide();
	$('.position-error').hide();
	$('.experience-error').hide();

	let employerError = false;
	let positionError = false;
	let experienceError = false;

	// Employer Validate Conatiner 3
	function employer() {
		const pattern = /^[a-zA-Z_][a-zA-Z_ ]*[a-zA-Z_]$/;
		const employer = $('#employer').val();
		if (pattern.test(employer) && employer !== '') {
			$('.employer-error').hide();
			$('#employer').css('border', '2px solid #34F458');
		} else {
			$('.employer-error').html('Should contain only Characters');
			$('.employer-error').show();
			$('#employer').css('border', '2px solid #F90A0A');
			employerError = true;
		}
	}

	// Position Validate Conatiner 3
	function position() {
		const pattern = new RegExp('^[a-zA-Z  ]+$');
		const position = $('#position').val();
		if (pattern.test(position) && position !== '') {
			$('.position-error').hide();
			$('#position').css('border', '2px solid #34F458');
		} else {
			$('.position-error').html('Should contain only Characters');
			$('.position-error').show();
			$('#position').css('border', '2px solid #F90A0A');
			positionError = true;
		}
	}

	// Experience Validate Conatiner 3
	function experience() {
		const experience = $('#experience').val();
		if (experience !== '' && !(experience > 25)) {
			$('.experience-error').hide();
			$('#experience').css('border', '2px solid #34F458');
		} else {
			$('.experience-error').html('Experience must be in between 0 - 25');
			$('.experience-error').show();
			$('#experience').css('border', '2px solid #F90A0A');
			experienceError = true;
		}
	}

	// TODO : 7. While registration of user all data must be store and local storage.
	// Experience Information
	// Completetd

	$('.btn-3').click(function() {
		employerError = false;
		positionError = false;
		experienceError = false;

		employer();
		position();
		experience();

		if (employerError === false && positionError === false && experienceError === false) {
			$('.sign-up-container-3').hide();
			$('.heading').text(thankyou);
			$('.t-title').text(checkDetail);
			$('.sign-up-container-4').show('clip', 990);
			$('.ui-progressbar .ui-progressbar-value').removeClass('bg-warning');
			$('.ui-progressbar .ui-progressbar-value').addClass('bg-success');
			displayPersonal();

			// TODO : 3. There must be progress bar at the bottom of the page giving information of progress of registration page.

			let val = 70;
			let interval = setInterval(() => {
				val = val + 1;
				$('.progressbar').progressbar({
					value: val
				});
				if (val === 100) clearInterval(interval);
			}, 10);

			$('.progressbar').hide('fade', 3000);

			const employer = $('#employer').val();
			const position = $('#position').val();
			const experience = $('#experience').val();

			localStorage.setItem('employer', employer);
			localStorage.setItem('position', position);
			localStorage.setItem('experience', experience);

			displayPersonal();
			displayEducational();
			displayExperience();

			return true;
		} else {
			return false;
		}
	});
});

// TODO : 2 - all these three section must be displayed by accordion.
// TODO : 7 - local storage which must be editable.
// Completed

/*         Display &  EDIT Functionality --- Personal Information                    */
// display part
const dusername1 = $('#username1');
const dSignUpEmail_1 = $('#sign-up-email1');
const ddatepicker1 = $('#datepicker1');
const dSignUpPassword1 = $('#sign-up-password1');

function displayPersonal() {
	let d1 = localStorage.getItem('username');
	let d2 = localStorage.getItem('email');
	let d3 = localStorage.getItem('date');
	let d4 = localStorage.getItem('pass');

	dusername1.val(d1);
	dSignUpEmail_1.val(d2);
	ddatepicker1.val(d3);
	dSignUpPassword1.val(d4);
}

// edit part
$('.edit-1').click(() => {
	$('.edit-1').hide();

	dusername1.prop('disabled', false);
	dSignUpEmail_1.prop('disabled', false);
	ddatepicker1.prop('disabled', false);
	dSignUpPassword1.prop('disabled', false);

	$('.done-1').show();
});

$('.done-1').click(() => {
	$('.done-1').hide();

	dusername1.prop('disabled', true);
	dSignUpEmail_1.prop('disabled', true);
	ddatepicker1.prop('disabled', true);
	dSignUpPassword1.prop('disabled', true);

	let setItem1 = localStorage.setItem('username', dusername1.val());
	let setItem2 = localStorage.setItem('email', dSignUpEmail_1.val());
	let setItem3 = localStorage.setItem('date', ddatepicker1.val());
	let setItem4 = localStorage.setItem('pass', dSignUpPassword1.val());

	$('.edit-1').show();
});

/*     Display & EDIT Functionality --- Educational Information                    */
// display
const dinstitution1 = $('#institution1');
const ddegree1 = $('#degree1');
const dpercentage1 = $('#percentage1');
const dpassout1 = $('#year-pass1');

function displayEducational() {
	let d1 = localStorage.getItem('institution');
	let d2 = localStorage.getItem('degree');
	let d3 = localStorage.getItem('percentage');
	let d4 = localStorage.getItem('passout');

	dinstitution1.val(d1);
	ddegree1.val(d2);
	dpercentage1.val(d3);
	dpassout1.val(d4);
}

// Edit part
$('.edit-2').click(() => {
	$('.edit-2').hide();

	dinstitution1.prop('disabled', false);
	ddegree1.prop('disabled', false);
	dpercentage1.prop('disabled', false);
	dpassout1.prop('disabled', false);

	$('.done-2').show();
});

$('.done-2').click(() => {
	$('.done-2').hide();

	dinstitution1.prop('disabled', true);
	ddegree1.prop('disabled', true);
	dpercentage1.prop('disabled', true);
	dpassout1.prop('disabled', true);

	let setItem1 = localStorage.setItem('institution', dinstitution1.val());
	let setItem2 = localStorage.setItem('degree', ddegree1.val());
	let setItem3 = localStorage.setItem('percentage', dpercentage1.val());
	let setItem4 = localStorage.setItem('passout', dpassout1.val());

	$('.edit-2').show();
});

/*       Display &  EDIT Functionality --- Experience Information                    */
// display
const demployer1 = $('#employer1');
const dposition1 = $('#position1');
const dexperience1 = $('#experience1');

function displayExperience() {
	let d1 = localStorage.getItem('employer');
	let d2 = localStorage.getItem('position');
	let d3 = localStorage.getItem('experience');

	demployer1.val(d1);
	dposition1.val(d2);
	dexperience1.val(d3);
}

// edit part
$('.edit-3').click(() => {
	$('.edit-3').hide();

	demployer1.prop('disabled', false);
	dposition1.prop('disabled', false);
	dexperience1.prop('disabled', false);

	$('.done-3').show();
});

$('.done-3').click(() => {
	$('.done-3').hide();

	demployer1.prop('disabled', true);
	dposition1.prop('disabled', true);
	dexperience1.prop('disabled', true);

	localStorage.setItem('employer', demployer1.val());
	localStorage.setItem('position', dposition1.val());
	localStorage.setItem('experience', dexperience1.val());

	$('.edit-3').show();
});

const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})
