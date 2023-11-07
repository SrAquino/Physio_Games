extends ColorRect

onready var dropdown_games = $DropdownGames
onready var capas = $BarraLateralDireita/GameCapa
export var jogoSelecionado = 0

func _ready():
	add_items()
	Global.global_score = 0
	Global.game_time = 0.0
	Global.movimentos = 0

func add_items():
	for n in capas.get_children():
		dropdown_games.add_item(n.name)

func _on_DropdownGames_item_selected(index):
	for i in capas.get_children():
		i.visible = false
	capas.get_child(index).visible = true
	jogoSelecionado = index
	Global.currentJogo = $DropdownGames.text
