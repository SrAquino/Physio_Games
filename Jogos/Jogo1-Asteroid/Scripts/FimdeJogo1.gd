extends Control

func _ready():
	var score_label = $Backgroun/Potuacao/Points
	var score = Global.get_score()
	score_label.text = str(score)
	
	atualizaBD()
	
func atualizaBD():
	var nomeP = Global.get_paciente_nome()
	var inst = Global.get_instituition()
	var currentJogo = Global.get_jogo()

	var dados := {
		"Data":{"stringValue": Time.get_datetime_string_from_system() },
		"Score":{"stringValue": Global.get_score() },
	}
	
	Firebase.save_document("Instituitions/"+inst+"/Pacientes/"+nomeP+"/Jogos/"+currentJogo+"/Sessões?documentId=%s"%Time.get_datetime_string_from_system(),dados,$HTTPRequest)


func _on_quit_pressed():
	get_tree().quit()  # Isso fecha o jogo
	
func _on_newGame_pressed():
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")


func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	print(body.get_string_from_ascii())
	print("response code: ",response_code)
	var result_body := JSON.parse(body.get_string_from_ascii()).result as Dictionary
	match response_code:
		404:
			$messageError.text = "Please, enter your information"
			return
		200:
			$messageError.text = "Information saved successfully"
		_:
			print("Unhandled response code:", response_code)
