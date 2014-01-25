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
		if (ballsSelected[i]) 	{
			ballsTexture[i].color.a = 1.0f;
			Camera.main.cullingMask |= 1<<(i+8);
		}
		else {
			ballsTexture[i].color.a = 0.0f;
			Camera.main.cullingMask &= ~(1<<(i+8));
		}
	}
}

function click(ball : int) {
	var i : int;
	var j : int;
	if (ballsSelected[ball]) {
		var n = 0;
		for (i = 0; i < ballsSelected.length; i++)
			if (ballsSelected[i])
				n++;
			
		if (n > 1) 
			ballsSelected[ball] = false;
	}
	else {
		for (i = 0; i < ballsObjects.length; i++) {
			var ba = ballsObjects[i];
			var cs = ba.GetComponent(ballScript).getActiveColors();
			if (cs[ball]) {
				for (j = 0; j < cs.length; j++) {
					ballsSelected[j] = cs[j];
				}
				break;
			
			}
			
		}
	}
}
