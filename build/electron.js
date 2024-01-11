const { app, BrowserWindow} = require("electron");
const path = require("path");
const express = require("express");
const isDev = require("electron-is-dev");
const appExpress = require("../src/server/index.js");

// const appExpress = express();
const port = 3001;

appExpress.use(express.static(__dirname + '/public'))
 //appExpress.use(express.static(path.join(__dirname, "/public/index.html")));

appExpress.listen(port, () => {
	console.log(`Servidor Express iniciado na porta ${port}`);
  });

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
	createWindow();
})

app.on("window-all-closed", () => {
	if(process.platform !== "darwin"){
		app.quit();
	}
})