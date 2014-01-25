#pragma strict

var background : GUITexture;

var ballsTexture: GUITexture[];
var ballsSelected : boolean[];

var ballsObjects : GameObject[];

function Update() {
	if (Input.GetMouseButtonDown(0)) {
		if (background.HitTest(Input.mousePosition)) {
			var v : Vector2 = Input.mousePosition;
			v.x /= Screen.width;
			v.y /= Screen.height;
			v -= background.transform.position;
			var angle : float = Mathf.Atan2(v.x, v.y);
			
			if (angle < 0f && angle > -2.0f*Mathf.PI/3.0f) {
				click(0);
			}
			else if (angle > 0f && angle < 2.0f*Mathf.PI/3.0f) {
				click(1);
			}
			else {
				click(2);
			}
		}
	}
	
	for (var i = 0; i < 3; i++) {
		if (ballsSelected[i]) 	ballsTexture[i].color.a = 1.0f;
		else					ballsTexture[i].color.a = 0.0f;
	}
}

function click(ball : int) {
	if (ballsSelected[ball]) {
		ballsSelected[ball] = false;
	}
	else {
		for (var i in ballsObjects.length) {
			var ba = ballsObjects[i];
			var cs = ba.getActiveColors();
			var b = false;
			for (var j in cs) {
				var c = cs[j];
				if (c == ball) {
					b = true;
					break;
				}
			}
			if (b) {
				for (var j in cs) {
					ballssSelected[cs[j]] = true;
				}
				break;
			}
		}
	}
}
