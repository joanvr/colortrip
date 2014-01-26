#pragma strict

@script ExecuteInEditMode

var shootingForce : Vector2 = new Vector2();
var showGUITarget = false;
var flying = false;
var virgin = true;

var texTarget : Texture;

var maxShotMagnitude : float;

public static var aiming = false;


//Haciendo estas variables public static para poder dibujar la linea de disparo
public static var slingshotBase : Vector2 = new Vector2();
public static var slingshotRelease : Vector2 = new Vector2();
public static var slingshotBaseMousePos : Vector2 = Vector2.zero;

private var slingshotDragMousePos : Vector2 = Vector2.zero;

var shootPower = 30.0;

private var beingShooted = false;

var activate : boolean;


var sfxBall1 : AudioClip;
var sfxBall2 : AudioClip;
var sfxBall3 : AudioClip;
var sfxBall4 : AudioClip;

function Start () {

	shootingForce.x = 30.0;
	shootingForce.y = 30.0;
}

function Update () {

	updateSprite();
	updatePhysics();

}

function OnGUI()
{
	var hitPoint3D = Camera.main.ScreenToWorldPoint(Input.mousePosition);

	//GUI.Label(new Rect(0.0,0.0,100.0,40.0),"Cursor: " + hitPoint3D.x + "," + hitPoint3D.y);

    var guiCoords : Vector3 = Camera.main.WorldToScreenPoint(slingshotRelease);
    
    if(showGUITarget) {
		//GUI.DrawTexture(new Rect(slingshotDragMousePos.x, Screen.height - slingshotDragMousePos.y, 10.0,10.0),texTarget);    	
		GUI.DrawTexture(new Rect(guiCoords.x - 5, Screen.height - guiCoords.y - 5, 10.0,10.0),texTarget);    	
    }
	
}

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.tag == "Ball") {
		audio.PlayOneShot(sfxBall4);
			
		if (virgin && collision.gameObject.GetComponent(ballScript).virgin) return;
		if (this.flying) { 
			var t2 : boolean[] = collision.gameObject.GetComponent(ballScript).getActiveColors();
			
			for (var i = 0; i < t2.length; i++) {
				type[i] = type[i] || t2[i];
				if (type[i])
					GameObject.Find("ballSelector").GetComponent(ballSelector).select(i);
			}
			Destroy(collision.gameObject);
		}
	}
	else {
		//play bounce sound
		if(type[0])
			audio.PlayOneShot(sfxBall1);
		else if(type[1])
			audio.PlayOneShot(sfxBall2);
		else if(type[2])
			audio.PlayOneShot(sfxBall3);

		this.rigidbody2D.gravityScale = 0.0;	
		this.rigidbody2D.angularVelocity = 0.0;
		this.rigidbody2D.velocity = Vector3.zero;
		flying = false;
	}
}

function OnCollision2D(collision : Collision2D) {
	if (collision.gameObject.tag == "Ball") {
		if (virgin && collision.gameObject.GetComponent(ballScript).virgin) return;
		if (this.flying) { 
			var t2 : boolean[] = collision.gameObject.GetComponent(ballScript).getActiveColors();
			
			for (var i = 0; i < t2.length; i++) {
				type[i] = type[i] || t2[i];
				if (type[i])
					GameObject.Find("ballSelector").GetComponent(ballSelector).select(i);
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

function OnCollisionExit2D(collision : Collision2D) {
	if (collision.gameObject.tag == "Ball") {
		virgin = false;
		this.rigidbody2D.gravityScale = 1.0;
	}
	else {
		this.rigidbody2D.gravityScale = 1.0;	
		flying = true;	
	}
}

function OnMouseDown () {
	if (!activate) return;
	
	slingshotBase = this.transform.position;
	showGUITarget = true;

	var hitPoint3D : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    
	slingshotBase.x = hitPoint3D.x;
    slingshotBase.y = hitPoint3D.y;
    
    slingshotBaseMousePos.x = Input.mousePosition.x;
	slingshotBaseMousePos.y = Input.mousePosition.y;

}

function OnMouseDrag () {	
    if (!activate) return;
    
	aiming = true;

    slingshotDragMousePos.x = Input.mousePosition.x;
    slingshotDragMousePos.y = Input.mousePosition.y;
    
    var hitPoint : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    slingshotRelease = hitPoint;
    
    if((slingshotRelease - slingshotBase).magnitude > maxShotMagnitude)
    {
    	var tempVec : Vector2 = slingshotRelease - slingshotBase;
    	tempVec.Normalize();
    	slingshotRelease = slingshotBase + tempVec * maxShotMagnitude;
    }
}


function OnMouseUp(){
	if (!activate) return;

	aiming = false;
	var i : int;
	var hitPoint : Vector3 = slingshotRelease;//Camera.main.ScreenToWorldPoint(Input.mousePosition);
	
	shootingForce = (this.transform.localPosition - hitPoint) * shootPower;		
	this.rigidbody2D.AddForce(shootingForce);
	showGUITarget = false;

	var bs = GameObject.Find("ballSelector").GetComponent(ballSelector);
	
	var nb = new boolean[3];
	
	for (i = 0; i < nb.length; i++)
		if (!bs.ballsSelected[i] && type[i])
			nb[i] = true;
	
	if ( anySelected(nb) ) {
		var nbo = Instantiate(this, transform.localPosition, transform.localRotation);
		var nbs = nbo.GetComponent(ballScript);
		nbs.type = nb;
		nbs.virgin = true;
		virgin = true;
		
		for (i = 0; i < nb.length; i++)
			if (nb[i]) type[i] = false; 
	}
	
}

function anySelected(nb : boolean[]) {
	return nb[0] || nb[1] || nb[2];
}

function justOneSelected(nb : boolean[]) {
	return 
		( nb[0] && !nb[1] && !nb[2]) ||
	 	(!nb[0] &&  nb[1] && !nb[2]) ||
	 	(!nb[0] && !nb[1] &&  nb[2]);
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
		Physics2D.IgnoreLayerCollision(gameObject.layer, i+8, !type[i]);
	}
}