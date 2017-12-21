/* global $ */
const electron = require("electron");
const url = require("url");
const path = require("path");


const {app, BrowserWindow, Menu} = electron;

let window;

//listen for app to be ready
app.on('ready', function(){
	
	//create new window
	window = new BrowserWindow({width: 800, height: 600})
		window.on('closed', () => {
  		window = null
		})
	
	
	//load html into window
	window.loadURL(url.format({
		pathname: path.join(__dirname,'..','..','index.html'),
		protocol: 'file',
		slashes: true
	}));
	
	//build menu from Template 
	const tMenu = Menu.buildFromTemplate(topMenu);
	//instering
	Menu.setApplicationMenu(tMenu);
});

//do something function
function doSomething(){
	console.log(process.platform);
}

// create menu template
const topMenu = [
	{
		label: 'File', 
		submenu:[
			{
				label: 'Add', 
				click(){
					doSomething();
				}
			},
			{
				label: 'Clear'
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];

//Add an extra thing id on MAC
if(process.platform == 'darwin'){ 
	topMenu.unshift({});
}

//add developer tools 
if(process.env.NODE_ENV !== 'production'){
	topMenu.push({
		label: 'Dev Tools',
		accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
		submenu:[
			{
				label: 'Dev',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			}, 
			{
				role: 'reload'
			}
		]
	});
}