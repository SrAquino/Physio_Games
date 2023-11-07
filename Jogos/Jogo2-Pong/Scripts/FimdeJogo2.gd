extends Control

func _ready():
	var score_label = $Backgroun/Potuacao/Points
	score_label.text =  Global.get_score()
	
	atualizaBD()
	
func atualizaBD():
	var CPF = Global.get_paciente_cpf()
	var inst = Global.get_instituition()
	var currentJogo = Global.get_jogo()

	var dados := {
		"Data":{"stringValue": Time.get_datetime_string_from_system() },
		"Score":{"stringValue": Global.get_score() },
		"Time":{"stringValue": Global.get_time()},
		"Movimentos":{"stringValue": Global.get_moves()}
	}
	
	Firebase.save_document("Instituitions/"+inst+"/Pacientes/"+CPF+"/Jogos/"+currentJogo+"/Sessões?documentId=%s"%Time.get_datetime_string_from_system(),dados,$HTTPRequest)


func _on_quit_pressed():
	get_tree().quit()  # Isso fecha o jogo
	
func _on_newGame_pressed():
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")


func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var result_body := JSON.parse(body.get_string_from_ascii()).result as Dictionary
	match response_code:
		404:
			$messageError.text = "Erro ao salvar a informação"
			return
		200:
			$messageError.text = "Information saved successfully"
		_:
			print("Unhandled response code:", response_code)

