#pragma strict

var background : GUITexture;

var ball1: GUITexture;
var ball2: GUITexture;
var ball3: GUITexture;

var ball1b : boolean;
var ball2b : boolean;
var ball3b : boolean;

function Update() {
	if (Input.GetMouseButtonDown(0)) {
		if (background.HitTest(Input.mousePosition)) {
			var v : Vector2 = Input.mousePosition;
			v.x /= Screen.width;
			v.y /= Screen.height;
			v -= background.transform.position;
			var angle : float = Mathf.Atan2(v.x, v.y);
			
			if (angle < 0f && angle > -2.0f*Mathf.PI/3.0f) {
				ball1b = !ball1b;
			}
			else if (angle > 0f && angle < 2.0f*Mathf.PI/3.0f) {
				ball2b = !ball2b;
			}
			else {
				ball3b = !ball3b;
			}
		}
	}
	
	if (ball1b) ball1.color.a = 1.0f;
	else		ball1.color.a = 0.0f;
	if (ball2b) ball2.color.a = 1.0f;
	else		ball2.color.a = 0.0f;
	if (ball3b) ball3.color.a = 1.0f;
	else		ball3.color.a = 0.0f;
}

function click(ball) {


}