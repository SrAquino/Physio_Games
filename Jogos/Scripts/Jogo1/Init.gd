extends Node2D

const pre_player = preload("res://Jogo1/Cenas/player.tscn")

func _ready():
	#Instancia o player na cena
	var player = pre_player.instance()
	call_deferred("add_child", player)

#func _process(delta):
#	pass
