#pragma strict

function Start () {
}

function Update () {

}

function OnGUI()
{
	if((Application.loadedLevel > 0))
	{
		if(GUI.Button(new Rect(Screen.width - 330,10,300,50),"Cheat: Skip level"))
		{
			Application.LoadLevel(Application.loadedLevel + 1);
		}
	}
}