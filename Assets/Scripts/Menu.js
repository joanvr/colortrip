// Use this for initialization

var showPlayButton = false;
var showResumeButton = false;
var showRestartButton = false;
var showExitButton = false;
var showGameTitle = true;

var firstTime = true;
var skinMenuButton : GUISkin;
var gamePaused = false;
var fontSizePlayButton : int = 70;
var fontSizeRestartButton : int = 50;
var fontSizeExitButton : int = 30;
var fontSizePauseButton : int = 30;

var titleHeight : int = 115;
var pauseTitleHeight : int = 115;
var buttonHeightPlayButton : int = 80;
var buttonHeightRestartButton : int = 60;
var buttonHeightExitButton : int = 40;
var buttonHeightPauseButton : int = 40;

var titleWidth : int = 540;
var pauseTitleWidth : int = 540;
var buttonWidthPlayButton : int = 300;
var buttonWidthRestartButton : int = 146;
var buttonWidthExitButton : int = 60;
var buttonWidthPauseButton : int = 300;
var pauseButtonRightMargin : int = 70;
var pauseButtonBottomMargin : int = 20;

var verticalRelativePosTitle : float = 0.25;
var verticalRelativePosPauseTitle : float = 0.25;
var verticalRelativePosPlayButton : float = 0.5;
var verticalRelativePosRestartButton : float = 0.7;
var verticalRelativePosExitButton : float = 0.8;
var verticalRelativePosPauseButton : float = 0.9;

var texGameTitle : Texture;
var texPauseTitle : Texture;
var texPlayButton : Texture;
var texResumeButton : Texture;
var texRestartButton : Texture;
var texExitButton : Texture;
var texPauseButton : Texture;
var texFloor : Texture;


function Awake(){

}

function Start () {
/*
	if(Application.loadedLevel == 0)
	{
		Time.timeScale = 0.0;
		showGameTitle = true;
		showPlayButton = true;
		showExitButton = true;
		showPauseButton = true;
		
		firstTime = false;
	}
	else
	{
		gamePaused = false;
	}
	*/
}

// Update is called once per frame
function Update () {
}

function OnGUI(){
	var savedSkin : GUISkin = GUI.skin;
	GUI.skin.button = skinMenuButton.button;
	renderGameTitle();
	renderPlayButton();
	renderRestartButton();
	renderExitButton();
	GUI.skin = savedSkin;
	
	if(gamePaused == false)
	{
		renderPauseButton();
	}
}

function pauseGame()
{
	gamePaused = true;
	Time.timeScale = 0.0;
	showGameTitle = true;
	showRestartButton = true;
	showPlayButton = false;
	showResumeButton = true;
	showExitButton = true;
}

function renderPlayButton()
{
	if(showPlayButton)
	{
		do_renderPlayButton(texPlayButton);
	}
	else if(showResumeButton)
	{
		do_renderPlayButton(texResumeButton);
	}
}


function do_renderPlayButton(tex)
{	
		var savedFontSize : int = GUI.skin.button.fontSize;
		GUI.skin.button.fontSize = fontSizePlayButton;
		
		if(GUI.Button(new Rect((Screen.width - buttonWidthPlayButton)/2,(Screen.height - 50.0) * verticalRelativePosPlayButton,buttonWidthPlayButton,fontSizePlayButton),tex))
		{
			Time.timeScale = 1.0;
			hideAllButtons();
			gamePaused = false;
		}
		GUI.skin.button.fontSize = savedFontSize;
}


function renderRestartButton()
{
	if(showRestartButton)
	{
		var savedFontSize : int = GUI.skin.button.fontSize;
		GUI.skin.button.fontSize = fontSizeRestartButton;

		if(GUI.Button(new Rect((Screen.width - buttonWidthRestartButton)/2,(Screen.height - 50) * verticalRelativePosRestartButton,buttonWidthRestartButton,buttonHeightRestartButton),texRestartButton))
		{
			Time.timeScale = 1.0;
			hideAllButtons();
			//Start();
			Application.LoadLevel(Application.loadedLevel);
		}
		GUI.skin.button.fontSize = savedFontSize;
	}
}

function renderExitButton()
{
	if(showExitButton)
	{
		var savedFontSize : int = GUI.skin.button.fontSize;
		GUI.skin.button.fontSize = fontSizeExitButton;
		
		if(GUI.Button(new Rect((Screen.width - buttonWidthExitButton)/2,(Screen.height - 50) * verticalRelativePosExitButton,buttonWidthExitButton,buttonHeightExitButton),texExitButton))
		{
			Application.Quit(); //ignored in the editor
		}
		GUI.skin.button.fontSize = savedFontSize;
	}
}

function hideAllButtons(){
	showGameTitle = false;
	showPlayButton = false;
	showResumeButton = false;
	showRestartButton = false;
	showExitButton = false;
}

function renderPauseButton(){
	if(GUI.Button(new Rect((Screen.width - buttonWidthPauseButton) - pauseButtonRightMargin,(Screen.height - buttonHeightPauseButton) - pauseButtonBottomMargin,buttonWidthPauseButton,buttonHeightPauseButton),texPauseButton))
		{
			pauseGame();
		}
}

function renderGameTitle()
{
	if(showGameTitle)
	{
		var savedColor : Color = GUI.color;
		GUI.color.a = 0.75;
		GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),texFloor);	
		GUI.color = savedColor;


	
		if(!gamePaused){
			GUI.DrawTexture(new Rect((Screen.width - titleWidth)/2,(Screen.height - titleHeight) * verticalRelativePosTitle,titleWidth,titleHeight),texGameTitle);	
		}
		else{
			GUI.DrawTexture(new Rect((Screen.width - pauseTitleWidth)/2,(Screen.height - pauseTitleHeight) * verticalRelativePosPauseTitle,pauseTitleWidth,pauseTitleHeight),texPauseTitle);			
		}
	}
}