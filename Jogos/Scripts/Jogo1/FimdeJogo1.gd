extends Control

func _ready():
	var score_label = $Backgroun/Potuacao/Points
	var score = Global.get_score()
	score_label.text = str(score)
	
	atualizaBD()
	
func atualizaBD():
	var nomeP = Global.get_paciente_nome()
	var dados = {
		'Data' :Time.get_datetime_dict_from_system(false),
		'Score':Global.get_score()
	}
	
	var fire_colection : FirestoreCollection = Firebase.Firestore.collection("Pacientes/"+nomeP+"/Partida")
	fire_colection.add(Time.get_datetime_string_from_system(),dados)


func _on_quit_pressed():
	get_tree().quit()  # Isso fecha o jogo
	
func _on_newGame_pressed():
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
