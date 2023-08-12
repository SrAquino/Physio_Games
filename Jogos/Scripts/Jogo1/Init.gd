extends Node2D

const pre_player = preload("res://Jogo1/Cenas/player.tscn")
const pre_asteroid = preload("res://Jogo1/Cenas/asteroide.tscn")
#export(NodePath) var pre_player

export var enemy_cadence = 3.0

func _ready():
	randomize()
	
	#Instancia o player na cena
	var player = pre_player.instance()
	call_deferred("add_child", player)

func _process(delta):
	$Enemy_cadence.set_wait_time(enemy_cadence)
	
func _on_Timer_timeout():
	var asteroid = pre_asteroid.instance()
	self.add_child(asteroid)
	asteroid.global_position = Vector2((randi()%1815)+106,-30)
