﻿#pragma strict

@script ExecuteInEditMode

var shootingForce : Vector2 = new Vector2();
var showGUITarget = false;
var flying = true;

var texTarget : Texture;

private var slingshotBase : Vector2 = new Vector2();
private var slingshotRelease : Vector2 = new Vector2();
private var slingshotBaseMousePos : Vector2 = Vector2.zero;
private var slingshotDragMousePos : Vector2 = Vector2.zero;

var shootPower = 30.0;

private var beingShooted = false;

function Start () {

	shootingForce.x = 30.0;
	shootingForce.y = 30.0;
}

function Update () {

	this.selectSprite();
	
	/*
	if(Input.GetKeyDown("space") && flying == false)
	{
		//this.rigidbody2D.gravityScale = 0.0;			
		//this.rigidbody2D.AddForce(shootingForce);	
	}*/	
}

function OnGUI()
{
	var hitPoint3D = Camera.main.ScreenToWorldPoint(Input.mousePosition);

	//GUI.Label(new Rect(0.0,0.0,100.0,40.0),"Cursor: " + hitPoint3D.x + "," + hitPoint3D.y);
    
    if(showGUITarget)
    {
		GUI.DrawTexture(new Rect(slingshotDragMousePos.x, Screen.height - slingshotDragMousePos.y, 10.0,10.0),texTarget);    	
    }
	
}

function OnCollisionEnter2D(collision : Collision2D) {
	this.rigidbody2D.gravityScale = 0.0;	
	this.rigidbody2D.angularVelocity = 0.0;
	this.rigidbody2D.velocity = Vector3.zero;
	flying = false;
}

function OnCollision2D(collision : Collision2D) {
	this.rigidbody2D.gravityScale = 0.0;	
	this.rigidbody2D.angularVelocity = 0.0;
	this.rigidbody2D.velocity = Vector3.zero;
	flying = false;
}

function OnCollisionExit2D(collision : Collision2D) {
	this.rigidbody2D.gravityScale = 1.0;	
	flying = true;
}

function OnMouseDown () {
	slingshotBase = this.transform.position;
	showGUITarget = true;

	var hitPoint3D : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    
	slingshotBase.x = hitPoint3D.x;
    slingshotBase.y = hitPoint3D.y;
    
    slingshotBaseMousePos.x = Input.mousePosition.x;
	slingshotBaseMousePos.y = Input.mousePosition.y;

}

function OnMouseDrag () {
    slingshotDragMousePos.x = Input.mousePosition.x;
    slingshotDragMousePos.y = Input.mousePosition.y;
}


function OnMouseUp(){
	var hitPoint : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
			
	shootingForce = (this.transform.localPosition - hitPoint) * shootPower;		
	this.rigidbody2D.AddForce(shootingForce);	
}

var type : colorType;

var cmy_spr : Sprite;
var cymag_spr : Sprite;
var cyyel_spr : Sprite;
var magyel_spr : Sprite;
var cy_spr : Sprite;
var mag_spr : Sprite;
var yel_spr : Sprite;


function selectSprite () {

	var SR = GetComponent(SpriteRenderer);

	if (type == colorType.cmy) SR.sprite = cmy_spr;
	if (type == colorType.cy) SR.sprite = cyyel_spr;
	if (type == colorType.cm) SR.sprite = cymag_spr;
	if (type == colorType.my) SR.sprite = magyel_spr;
	if (type == colorType.c) SR.sprite = cy_spr;
	if (type == colorType.m) SR.sprite = mag_spr;
	if (type == colorType.y) SR.sprite = yel_spr;

}


public function getActiveColors() {
	
	var cols = new Array(3);
	
	cols[0] = 
		type == colorType.cmy ||
		type == colorType.cy ||
		type == colorType.cm ||
		type == colorType.c;
	
	cols[1] = 
		type == colorType.cmy ||
		type == colorType.my ||
		type == colorType.cm ||
		type == colorType.m;
		
	cols[2] = 
		type == colorType.cmy ||
		type == colorType.cy ||
		type == colorType.my ||
		type == colorType.y;
		
	return cols;
	
}