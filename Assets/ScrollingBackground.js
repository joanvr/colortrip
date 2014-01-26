#pragma strict

var tfmFondo1 : Transform;

var texFondo1 : Texture2D;
var texFondo2 : Texture2D;
var texFondo3 : Texture2D;
var texFondo4 : Texture2D;
var texFondo5 : Texture2D;
var texFondo6 : Texture2D;
var texFondo7 : Texture2D;
var texFondo8 : Texture2D;
var texFondo9 : Texture2D;



//
function Start () {
//InvokeRepeating("EspaunearFondo", 1.0, 1.0);

	EspaunearFondo();
}

function EspaunearFondo() { // :P
	var fondoRect : Rect = new Rect(0.0,0.0,1.0,1.0);
	
	/*
	var sprFondo1 : Sprite = Sprite.Create(texFondo1,Vector2.zero,100.0);
	var sprFondo2 : Sprite = Sprite.Create(texFondo2,Vector2.zero,100.0);
	var sprFondo3 : Sprite = Sprite.Create(texFondo3,Vector2.zero,100.0);
	var sprFondo4 : Sprite = Sprite.Create(texFondo4,Vector2.zero,100.0);
	var sprFondo5 : Sprite = Sprite.Create(texFondo5,Vector2.zero,100.0);
	var sprFondo6 : Sprite = Sprite.Create(texFondo6,Vector2.zero,100.0);
	var sprFondo7 : Sprite = Sprite.Create(texFondo7,Vector2.zero,100.0);
	var sprFondo8 : Sprite = Sprite.Create(texFondo8,Vector2.zero,100.0);
	var sprFondo9 : Sprite = Sprite.Create(texFondo9,Vector2.zero,100.0);
	*/
	
	var fondos = new Array();
	//fondos.Add(sprFondo1,sprFondo2);

	//var instance : Transform = Instantiate(tfmFondo1,Vector2.zero,Quaternion.identity);
	var instance : Transform = Instantiate(tfmFondo1);
	instance.rigidbody2D.velocity = new Vector2(0.0,100.0);
	//instance.rigidbody2D.AddForce(new Vector2(0.0,1.0));
}

function Update () {
}