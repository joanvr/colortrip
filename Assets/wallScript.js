#pragma strict

var type : colorType;

function Start () {

}

function Update () {

	if (type == colorType.cmy) 
		GetComponent(SpriteRenderer).color = Color.black;
		
	if (type == colorType.cy) 
		GetComponent(SpriteRenderer).color = Color.green;
		
	if (type == colorType.cm) 
		GetComponent(SpriteRenderer).color = Color.blue;
		
	if (type == colorType.my) 
		GetComponent(SpriteRenderer).color = Color.red;
		
	if (type == colorType.c) 
		GetComponent(SpriteRenderer).color = Color.cyan;
		
	if (type == colorType.m) 
		GetComponent(SpriteRenderer).color = Color.magenta;	
		
	if (type == colorType.y) 
		GetComponent(SpriteRenderer).color = Color.yellow;
}