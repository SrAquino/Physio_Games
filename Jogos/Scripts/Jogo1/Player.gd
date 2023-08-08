extends Node2D

var speed = 10

func _ready():
	pass
	
func _process(delta):
	movePlayer_teclado()
	pass
	
func movePlayer_teclado():
	if Input.is_action_pressed("ui_left"):
		translate(Vector2(-1,0)*speed)
	if Input.is_action_pressed("ui_right"):
		translate(Vector2(1,0)*speed)
	if Input.is_action_pressed("ui_up"):
		translate(Vector2(0,-1)*speed)
	if Input.is_action_pressed("ui_down"):
			translate(Vector2(0,1)*speed)
