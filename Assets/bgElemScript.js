﻿#pragma strict

function Start () {

}

function Update () {

	if (this.transform.position.x > 20 || this.transform.position.y > 20)
		Destroy(this.gameObject);
}