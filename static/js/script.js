/* global $, document */

let users = {
	admin : [
		{
			fname    : 'Milton',
			lname    : 'Edwards',
			id 		 : 'administrator',
			password : 'adminlogin',
			initials : 'ME'
		}
	],
	assistants : [
		{
			fname 	 : 'Mary',
			lname 	 : 'Jane',
			id 		 : '620000001',
			password : 'MJ001',
			initials : 'MJ', 
			schedule : []
		},
		{
			fname 	 : 'John',
			lname 	 : 'Doe',
			id 		 : '620000002',
			password : 'JD002',
			initials : 'JD', 
			schedule : []
		}
	]
}

let log = null;


$( document ).ready(function () {
	// ***********************************************
	//side nav
	$( ".button-collapse" ).sideNav();
	$('.hamburger-menu').click(function () {
		$('#mySidenav').css({
			width: "250px"
		});
		$('#mySidenav a').css({
			display: "block"
		});
		appState();
	});
	$('.closebtn').click(function () {
		$('#mySidenav a').css({
			display: "none"
		});
		$('#mySidenav').css({
			width: "0px"
		});
	});
	// ***********************************************


	// ***********************************************
	//state of system when first launched
	appState();
	// ***********************************************


	// ***********************************************
	//when ever a user clicks a schedule slot
	$('.sclick').click(function () {
		$('.sclick').removeClass('cal-heighlight');
		$(this).addClass('cal-heighlight');
	
	});
	$('.sclick').dblclick(function () {
		//needs to test if the user is already reistered for that slot
		//needs to ensure that nothing is overridden
		$(this).removeClass('cal-heighlight');
		$(this).text(log.initials);
	});
	// ***********************************************


	// ***********************************************
	//handles logout of system
	$('.sign-out').click(function() {
		log = null;
		appState();

	})
	// ***********************************************


	// ***********************************************
	//handles system login
	$('#submit-login').click(function(e) {
		e.preventDefault();
		let password = $('#login-password');
		let userid = $('#login-id');

		if(!password.val() || !userid.val()){
			if(!password.val()){
				password.addClass("invalid");
			}
			else{
				password.removeClass("invalid");
			}
			if(!userid.val()){
				userid.addClass("invalid");
			}
			else{
				userid.removeClass("invalid");
			}
		}
		else{
			let admin = users.admin;
			let assistants = users.assistants;
			password = password.val();
			userid = userid.val();
			let l = admin.length;
			//check to see if is an admin
			for (var i = 0; i < l; i++) {
				if(admin[i].password == password && admin[i].id == userid){
					// found a user so set it to admin
					log = admin[i];
					login(log,'Home');
					break;
				}
			}
			if(!log){
				l = assistants.length;
				for (var i = 00; i < l; i++) {
					if(assistants[i].password == password && assistants[i].id == userid){
						log = assistants[i];
						login(log,'Home');
						break;
					}
				}

			}

			//if it runs through both for loops and still no user then error lol
			if(!log){
				$('.login-form-error').css({
					display:'block'
				});
				$('.login-form-error').text('Invalid User Credentials');
			}	
			else{
				$('.login-form-error').css({
					display:'none'
				});
			}
		}
	})
	// ***********************************************


	// ***********************************************

/*{
	var i;
	var admin = {name : 'admnistrator', password:'admin', id:'620070358'}
	let state = localStorage.getItem('state');
	if(!state){
		localStorage.setItem('state','false');
		state = localStorage.getItem('state');
	}
	
	// $( "#login-screen" ).addClass("is-shown");
	console.log(state);
	if(localStorage.getItem('state') === 'true'){
		$( "#login-screen" ).addClass("hide");
		$( "#home-screen" ).addClass("is-shown");
		localStorage.setItem('state','true');
		console.log(localStorage.getItem('state'));
	}
	else{
		$( "#login-screen" ).addClass("is-shown");
		$( "#home-screen" ).removeClass("is-shown");
	}

	$( ".login-screen input" ).keyup(function () {
		$( this ).removeClass("invalid");
		$( this ).addClass("valid");
	});
	
	let images = ['landing.jpg','landing-highlight.jpg','landing-name.jpg','landing-name-highlight.jpg'];
	let counter = 1;
	let im2 = ['landing-tue.jpg','landing-highlight-tue.jpg','landing-name-tue.jpg','landing-name-highlight-tue.jpg'];
	let c2 = 1;
	$(".btn-stay").click(function (e) {
		e.preventDefault();

		if(counter === 0){
			$('#bg').attr("src",'static/img/'+images[counter]);
			counter = 1;

		}
		else if(counter === 1){
			$('#bg').attr("src",'static/img/'+images[counter]);
			counter = 2
		}
		else if (counter === 2){
			$('#bg').attr("src",'static/img/'+images[counter]);
			counter = 3;
		}
		else{
			$('#bg').attr("src",'static/img/'+images[counter]);
			counter = 0;
		}
		
	});
	
	$(".btn-stay2").click(function (e) {
		e.preventDefault();

		if(c2 === 0){
			$('#bg').attr("src",'static/img/'+im2[c2]);
			c2 = 1;
		}
		else if(c2 === 1){
			$('#bg').attr("src",'static/img/'+im2[c2]);
			c2 = 2
		}
		else if (c2 === 2){
			$('#bg').attr("src",'static/img/'+im2[c2]);
			c2 = 3;
		}
		else{
			$('#bg').attr("src",'static/img/'+im2[c2]);
			c2 = 0;
		}
		
	});

	$( "#submit-login" ).click(function (e) {
		e.preventDefault();
		
		var person = {
			"id": $( "#student-id" ).val(),
			"password": $( "#student-password" ).val()
		};
		
		if (login(person, admin)) {
			$( "#student-password" ).val(""); 
			$( "#student-id" ).val("");
			
			$( ".login-screen" ).removeClass("is-shown");
			$( "#home-screen" ).addClass("is-shown");
			localStorage.setItem('state', true);
		} else {
			$( ".login-screen input" ).addClass("invalid");
		}
	});
	
	$( "#logout-btn" ).click(function (e) {
		e.preventDefault();
		logout();
		
		$( "#login-screen" ).addClass("is-shown");
		$( "#home-screen" ).removeClass("is-shown");
		
	});
	
	
	
	
	$('.available').click(function () {
//		console.log($(this));
	});
	
	var time = {hr : 8, min : 0};
	$.each($('.time'), function () {
		if (time.hr < 10) {
			if (time.min < 10) {
				$(this).text('0'+time.hr + ':' + '0'+time.min);
			}
			else {
				$(this).text('0'+time.hr + ':' + time.min);
			}
		}
		else {
			if (time.min < 10) {
				$(this).text(time.hr + ':' + '0'+time.min);
			}
			else {
				$(this).text(time.hr + ':' + time.min);
			}
		}
		time.hr++;
		if (time.hr === 13) {
			time.hr = 1;
		}
	});
}*/
});

function appState() {
	if(!log){
		$('.login').css({
			display:'none'
		});
		setHead('Login');
		$( '#login-screen' ).removeClass('hide');
		$( '#login-screen' ).addClass('is-shown');
		$( '#home-screen' ).removeClass('is-shown');
		$( '#home-screen' ).removeClass('hide');
	}else{
		$('.login').css({
			display:'block'
		});
	}
}

function login(person,title) {
	appState();
	if(person){
		$( '#login-screen' ).removeClass('is-shown');
		$( '#home-screen' ).addClass('is-shown');
		setHead(title);
		return true;
	}

	return false;

}

function setHead(title) {
	$('.header-title').text(title);
}


function swapScreen(screen) {
	
}