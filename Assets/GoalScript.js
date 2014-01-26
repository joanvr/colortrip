#pragma strict

function OnCollisionEnter2D(collision : Collision2D) {
	if (collision.gameObject.tag == "Ball") {
		Application.LoadLevel(Application.loadedLevel+1);
	}
}