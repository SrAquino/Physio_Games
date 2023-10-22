extends CanvasLayer

var score = 0
var lifes = 3

func _ready():
	pass # Replace with function body.

func asteroid_destroied(asteroid):
	var point = (6 - asteroid.escolhido)*10
	score += point
	$score.text = str(score)
	
func player_destroied(jogador):
	lifes -= 1
	$lifes.text = str(lifes)+"x"
	if lifes == 1:
		jogador.lifes = 0
		Global.global_score = score
