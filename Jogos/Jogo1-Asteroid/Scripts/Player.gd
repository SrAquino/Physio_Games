extends Node2D

export var speed = 350
const pre_tiro = preload("res://Jogo1-Asteroid/Cenas/tiro.tscn")
signal destruido(node)
var lifes


func _ready():	
	#Inicia a nave no centro
	global_position.x = 960
	global_position.y = 960
	
func _process(delta):
	#Mantém a nave dentro do limite
	limites_movimento()
	
	#Controla a nave pelo teclado	
	control_teclado(delta)

func limites_movimento():
	global_position.x = clamp(global_position.x, 106, 1815)
	global_position.y = clamp(global_position.y, 121, 981)

func cadence():
	if get_tree().get_nodes_in_group("Tiros").size() < 3:
		return 1
	else: 
		return 0

func control_teclado(delta: float):
	movePlayer_teclado(delta)
	tiro_teclado()

func tiro_teclado():
	if Input.is_action_just_pressed("ui_accept"):
		#Controla a cadência de tiros
		if cadence() == 1:
			var tiro = pre_tiro.instance()
			get_parent().add_child(tiro)
			tiro.global_position = $main_cannon.global_position
	
func movePlayer_teclado(delta: float):
	#Movimentações
	translate(Vector2(Input.get_axis("ui_left","ui_right") * speed * delta, 0)) 
	translate(Vector2(0,Input.get_axis("ui_up","ui_down") * speed * delta))
	
func _on_Area2D_area_entered(area):
	emit_signal("destruido",self)
	if lifes == 0:
		queue_free()
		FadeTransitions.fade_in("res://Jogo1-Asteroid/Cenas/FimdeJogo1.tscn")
		
