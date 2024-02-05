const { app, BrowserWindow} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { spawn } = require('child_process');
// const {fechaDB} = require('../backend/DataBase/configDB.js')

let expressProcess;
const expressPath = path.join(__dirname, '../backend/Server/server.js');

function createWindow(){
	const win = new BrowserWindow({
		width: 1500,
		height: 800,
		webPreferences: { 
			nodeIntegration: true, 
		  }
	});

	win.loadURL( isDev ? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
}

app.whenReady().then(() => {
	expressProcess = spawn('node', [expressPath]);

  	expressProcess.stdout.on('data', (data) => {
    	console.log(`Saida do servidor Express: ${data}`);
  	});

	createWindow();

})

app.on("window-all-closed", () => {
	if(process.platform !== "darwin"){
		app.quit();
	}
})

app.on('before-quit', () => {
	expressProcess.kill();
	// fechaDB();
  });