#pragma strict

var textures : Sprite[];

var prefab : Rigidbody2D;

function Start () {
	for (var i = 0; i < 50; i++) {
		var o = Instantiate(prefab, Vector3(Random.Range(-25.0f, 15.0f), Random.Range(-15.0f, 10.0f), 1.5f), Quaternion.identity);
		o.GetComponent(SpriteRenderer).sprite = textures[Random.Range(0, textures.length)];
		o.rigidbody2D.velocity = Vector3(Random.Range(0.3f, 0.5f), Random.Range(0.8f, 1.3f), 0.0f);
		o.transform.parent = this.gameObject.transform;
	}
}

function Update () {
	if (Random.value < 0.04f) {
		var o = Instantiate(prefab, Vector3(Random.Range(-25.0f, 15.0f), -15.0f, 1.5f), Quaternion.identity);
		o.GetComponent(SpriteRenderer).sprite = textures[Random.Range(0, textures.length)];
		o.rigidbody2D.velocity = Vector3(Random.Range(0.3f, 0.5f), Random.Range(0.8f, 1.3f), 0.0f);
		o.transform.parent = this.gameObject.transform;
	}
	
}