#pragma strict

@script ExecuteInEditMode

var materials : Material[];
var type : int; 

function Update () {

	renderer.material = materials[type];	
	
}