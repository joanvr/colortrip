#pragma strict

var lineMaterial : Material;

var slingshotRelease : Vector2;
var slingshotBase : Vector2;



function Start () {

}

function Update () {
slingshotRelease = ballScript.slingshotRelease;
slingshotBase = ballScript.slingshotBase;
}

function CreateLineMaterial() {
	if( !lineMaterial ) {
		lineMaterial = new Material( "Shader \"Lines/Colored Blended\" {" +
			"SubShader { Pass { " +
			"    Blend SrcAlpha OneMinusSrcAlpha " +
			"    ZWrite Off Cull Off Fog { Mode Off } " +
			"    BindChannels {" +
			"      Bind \"vertex\", vertex Bind \"color\", color }" +
			"} } }" );
		lineMaterial.hideFlags = HideFlags.HideAndDontSave;
		lineMaterial.shader.hideFlags = HideFlags.HideAndDontSave;
	}
}

function OnPostRender() {
	CreateLineMaterial();
	// set the current material
	if(ballScript.aiming)
	{
	
	 GL.PushMatrix();
	 // Draw your stuff
	lineMaterial.SetPass( 0 );

	GL.Begin( GL.LINES );
	GL.Color( Color(0.2,0.2,0.21,1.0) );
	GL.Vertex3( slingshotBase.x, slingshotBase.y, -2.5 );
	GL.Color( Color(0.4,0.4,0.41,0.5) );
	GL.Vertex3( slingshotRelease.x, slingshotRelease.y, -2.5 );
	GL.End();
	 GL.PopMatrix();
	
	}
}