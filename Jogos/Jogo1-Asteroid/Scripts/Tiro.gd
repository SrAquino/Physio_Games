extends Node2D

var speed = 500

func _ready():
	pass 

func _process(delta):
	translate(Vector2(0, -1) * speed * delta)

#Destrói o objeto quando sai da tela
func _on_VisibilityNotifier2D_screen_exited():
	queue_free()
	
func _on_Area2D_area_entered(_area):
	queue_free()
