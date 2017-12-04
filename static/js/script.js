/* global $, document */

let users = {
	admin : [
		{
			fname    : 'Milton',
			lname    : 'Edwards',
			id 		 : 'administrator',
			password : 'administrator',
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
	$('.modal').modal({
		ready: function() {
        	$('body').css({overflow: 'hidden'});
    	},
    	complete: function() { 
    		$('body').css({overflow: ''});
    	}
    });
	$('select').material_select();
	// ***********************************************
	//side nav
	$('.container').click(closeSide);
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
	$('.closebtn').click(closeSide);
	function closeSide() {
		$('#mySidenav a').css({
			display: "none"
		});
		$('#mySidenav').css({
			width: "0px"
		});
	};
	// ***********************************************


	// ***********************************************
	//state of system when first launched
	appState();
	// ***********************************************


	// ***********************************************
	//when ever a user clicks a schedule slot
	
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

	$('#mySidenav a').click(function () {
		swapScreen($(this).attr('id').split('-')[0]);
	});

	// ***********************************************

	$('#maintain-click').click(function () {
		openModal({head:'maintain', message:'none'})
	});

	$('#submit-maintain').click(function () {
		let servicetag = $('#servicetag');
		if(servicetag.val() === ''){
			servicetag.addClass('invalid');
			$('.maintain-form-error').text('Please fill out required field');
			$('.maintain-form-error').css({
				display:'block'
			});
		}
		else{
			servicetag.removeClass('invalid');
			$('.maintain-form-error').text();
			$('.maintain-form-error').css({
				display:'none'
			});
			if($('.cstatus').find(":selected").text() === 'Status'){
				$('.cstatus').addClass('invalid');
			}else{
				$('.cstatus').removeClass('invalid');

				let status = $('.cstatus').find(":selected").text().toLowerCase();
				servicetag = servicetag.val();

				let li = $('<li></li>',{
					class:'collection-item avatar'
				});
				let i = $('<i></i>',{
					class:'material-icons circle',
					text:'computer'
				});
				let span = $('<span></span>',{
					class:'title',
					text:'Device ID: ' + servicetag
				});
				let p = $('<p></p>',{
					text:'Maintained By: ' + log.fname + " " + log.lname
				});
				let p2 = $('<p></p>',{
					text:'Date Maintained: ' + '12-'+parseDate(Date())
				});
				let span2 = $('<span></span>',{
					class: status
				});
				let i2 = $('<i></i>',{
					class:'material-icons right',
					text:'fiber_manual_record'
				});
				let p3 = $('<p></p>',{
					text:'lol'
				});
				let p4 = $('<p></p>',{
					text:'Status: '+$('.cstatus').find(":selected").text()
				});
				p3.css({
					color:'#fff'
				});
				i.appendTo(li);
				span.appendTo(li);
				p.appendTo(li);
				p2.appendTo(li);
				span2.appendTo(p2);
				i2.appendTo(span2);
				p3.appendTo(li);
				p4.appendTo(li);
				li.appendTo($('.maintenance-ul'));
				$('#servicetag').val('');
				// $('#modal1').modal('close');
				openModal({head:'message', message:'Successfully Submitted'});
				// <li class="collection-item avatar">
			 //    	<i class="material-icons circle">computer</i>
			 //    	<span class="title">Device ID: CSENG003</span>
			 //    	<p>Last Maintained By: Administrator</p>
			 //    	<p>Date Maintained: 12-01-2017<span class='online'><i class="material-icons right">fiber_manual_record</i></span></p>
			 //    	<p>&nbsp;</p>
			 //    	<p>Status: Online</p>
			 //    </li>

			}
		}
	});

	$('#offline-show').click(function () {
		if($(this).is(':checked')){
			console.log('checked');
			$('.online').parent().parent().css({
				display:'none'
			});
		}else{
			$('.online').parent().parent().css({
				display:'block'
			});
		}
	});
});

function appState() {
	if(!log){
		menu('','logout');
		swapScreen('login');
		$('.sclick').unbind('click', highlightCal);
		$('.sclick').unbind('dblclick', setCal);
	}else{
		menu('','login');
		$('.sclick').unbind('click', highlightCal);
		$('.sclick').unbind('dblclick', setCal);
		$('.sclick').bind('click', highlightCal);
		$('.sclick').bind('dblclick', setCal);
		return true;
	}
}

function parseDate(date) {
	date = date.split(' ');
	date = date.splice(2,2);
	date = date.join('-');
	return date;


	// Mon Dec 04 2017 05:36:48 GMT-0500 (Eastern Standard Time)[]
}

function highlightCal() {
	let txt = $(this).text();//administrator
	txt = txt.split(' ');
	let l = txt.length;
	$('.sclick').removeClass('cal-heighlight');
	$(this).addClass('cal-heighlight');
	if(l === 5 && txt.indexOf(log.initials) === -1){
		$('.sclick').removeClass('cal-heighlight');
		openModal({head : 'message', message : 'Session Full. This session can only have 5 persons.'});
	}
}

function openModal(type) {
	$('#modal1').modal('open');
	if(type.head === 'message'){
		$('.modal-content h5').text('Message');
		$('.modal-message').css({
			display:'block'
		});
		$('.form-maintain').css({
			display:'none'
		});
		$('.form-signup').css({
			display:'none'
		});
		$('.form-grading').css({
			display:'none'
		});
		$('.ok-btn').css({
			display:'block'
		});
		$('.modal-message p').css({
			display:'block'
		});
		$('.modal-message p').text(type.message);
	}
	else if(type.head === 'grade'){
		$('.modal-content h5').text('Grading');
		$('.modal-message').css({
			display:'none'
		});
		$('.form-maintain').css({
			display:'none'
		});
		$('.form-signup').css({
			display:'none'
		});
		$('.form-grading').css({
			display:'block'
		});
		$('.modal-message p').css({
			display:'none'
		});
		$('.ok-btn').css({
			display:'none'
		});
	}
	else if(type.head === 'signup'){
		$('.modal-content h5').text('New Employee');
		$('.modal-message').css({
			display:'none'
		});
		$('.form-maintain').css({
			display:'none'
		});
		$('.form-signup').css({
			display:'block'
		});
		$('.form-grading').css({
			display:'none'
		});
		$('.modal-message p').css({
			display:'none'
		});
		$('.ok-btn').css({
			display:'none'
		});
	}
	else if(type.head === 'maintain'){
		$('.modal-content h5').text('New Device');
		$('.modal-message').css({
			display:'none'
		});
		$('.form-maintain').css({
			display:'block'
		});
		$('.form-signup').css({
			display:'none'
		});
		$('.form-grading').css({
			display:'none'
		});
		$('.modal-message p').css({
			display:'none'
		});
		$('.ok-btn').css({
			display:'none'
		});
	}

}
function setCal() {
	$(this).removeClass('cal-heighlight');
	if(!$(this).text()){
		$(this).text(log.initials);
	}else{
		let name = updateField($(this).text(),log.initials);
		$(this).text(name);
	}
}

function login(person,title) {
	appState();
	if(person){
		swapScreen('home');
		return true;
	}

	return false;

}

function updateField(f, name){
	let txt = f.split(' ');
	if(txt.indexOf(name) === -1){
		txt = txt.concat(name);
	}
	else{
		txt.splice(txt.indexOf(name),1);
	}
	txt = txt.join(' ');
	return txt;
}

function setHead(title) {
	$('.header-title').text(title);
}

function route(argument) {
	// fa-home
}

function menu(account,state) {
	// fa-home
	if(state === 'login'){
		$('.login').css({
			display:'block'
		});
	}else{
		$('.login').css({
			display:'none'
		});
	}
}

function swapScreen(screen) {
	if(screen === 'login'){
		setHead('Login');
		$( '#maintenance-screen' ).removeClass('is-shown');
		$( '#home-screen' ).removeClass('is-shown');
		$( '#login-screen' ).addClass('is-shown');
		$( '#admin-screen' ).removeClass('is-shown');
	}
	else if(screen === 'schedule'){
		setHead('Schedule');
		$( '#maintenance-screen' ).removeClass('is-shown');
		$( '#home-screen' ).addClass('is-shown');
		$( '#login-screen' ).removeClass('is-shown');
		$( '#admin-screen' ).removeClass('is-shown');
		$( '#grades-screen' ).removeClass('is-shown');
	}
	else if(screen === 'home'){
		if(appState()){
			setHead('Schedule');
			$( '#maintenance-screen' ).removeClass('is-shown');
			$( '#home-screen' ).addClass('is-shown');
			$( '#login-screen' ).removeClass('is-shown');
			$( '#admin-screen' ).removeClass('is-shown');
			$( '#grades-screen' ).removeClass('is-shown');
		}
	}
	else if(screen === 'maintenance'){
		setHead('Maintenance');
		$( '#maintenance-screen' ).addClass('is-shown');
		$( '#home-screen' ).removeClass('is-shown');
		$( '#login-screen' ).removeClass('is-shown');
		$( '#admin-screen' ).removeClass('is-shown');
		$( '#grades-screen' ).removeClass('is-shown');
	}
	else if(screen === 'grades'){
		setHead('Grading');
		$( '#maintenance-screen' ).removeClass('is-shown');
		$( '#home-screen' ).removeClass('is-shown');
		$( '#login-screen' ).removeClass('is-shown');
		$( '#admin-screen' ).removeClass('is-shown');
		$( '#grades-screen' ).addClass('is-shown');
	}
	else if(screen === 'admin'){
		setHead('Admin');
		$( '#maintenance-screen' ).removeClass('is-shown');
		$( '#home-screen' ).removeClass('is-shown');
		$( '#login-screen' ).removeClass('is-shown');
		$( '#admin-screen' ).addClass('is-shown');
		$( '#grades-screen' ).removeClass('is-shown');
	}
}