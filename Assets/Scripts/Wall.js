#pragma strict

@script ExecuteInEditMode

var materials : Material[];
var type : int; 

function Update () {

	renderer.material = materials[type];	
	gameObject.layer = type + 8; // MAGIA ES UN 8
}