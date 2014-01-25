#pragma strict

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

	updateSprite();
	
	updatePhysics();
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
//		GUI.DrawTexture(new Rect(slingshotDragMousePos.x, Screen.height - slingshotDragMousePos.y, 10.0,10.0),texTarget);    	
    }
	
}

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.tag == "Ball") {
		if (this.flying) { 
			var t2 : boolean[] = collision.gameObject.GetComponent(ballScript).getActiveColors();
			
			for (var i = 0; i < t2.length; i++) {
				type[i] = type[i] || t2[i];
			}
			Destroy(collision.gameObject);
		}
	}
	else {
		this.rigidbody2D.gravityScale = 0.0;	
		this.rigidbody2D.angularVelocity = 0.0;
		this.rigidbody2D.velocity = Vector3.zero;
		flying = false;
	}
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

var type : boolean[];

var spr_012 : Sprite;
var spr_01 : Sprite;
var spr_12 : Sprite;
var spr_02 : Sprite;
var spr_0 : Sprite;
var spr_1 : Sprite;
var spr_2 : Sprite;


function updateSprite () {
	var SR = GetComponent(SpriteRenderer);

	if ( type[0] &&  type[1] &&  type[2])
		SR.sprite = spr_012;
	if ( type[0] &&  type[1] && !type[2])
		SR.sprite = spr_01;
	if ( type[0] && !type[1] &&  type[2])
		SR.sprite = spr_02;
	if (!type[0] &&  type[1] &&  type[2])
		SR.sprite = spr_12;
	if ( type[0] && !type[1] && !type[2])
		SR.sprite = spr_0;
	if (!type[0] &&  type[1] && !type[2])
		SR.sprite = spr_1;
	if (!type[0] && !type[1] &&  type[2])
		SR.sprite = spr_2;
}


public function getActiveColors() {
	return type;
}

function updatePhysics() {
	for (var i = 0; i < 3; i++) {
		var origin = gameObject.layer;
		var dest = i+8;
		var col = !type[i];
		Physics2D.IgnoreLayerCollision(dest, origin, col);
	}
}
