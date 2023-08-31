extends Node2D

const pre_player = preload("res://Jogo1-Asteroid/Cenas/player.tscn")
const pre_asteroid = preload("res://Jogo1-Asteroid/Cenas/asteroide.tscn")
const pre_explosion = preload("res://Jogo1-Asteroid/Cenas/explosion.tscn")
export var enemy_cadence = 3.0

func _ready():
	randomize()
	
	#Instancia o player na cena
	var player = pre_player.instance()
	call_deferred("add_child", player)
	player.connect("destruido", self, "on_player_destroied")

func _process(delta):
	$Enemy_cadence.set_wait_time(enemy_cadence)
	
func _on_Timer_timeout():
	var asteroid = pre_asteroid.instance()
	self.add_child(asteroid)
	asteroid.global_position = Vector2((randi()%1815)+106,-30)
	asteroid.connect("destruido", self, "on_asteroid_destroied")
	
func on_asteroid_destroied(asteroid):
	var e = pre_explosion.instance()
	add_child(e)
	e.global_position = asteroid.global_position
	get_tree().call_group("hud", "asteroid_destroied", asteroid)
	
func on_player_destroied(jogador):
	var e = pre_explosion.instance()
	add_child(e)
	e.global_position = jogador.global_position
	get_tree().call_group("hud", "player_destroied", jogador)
