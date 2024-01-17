extends Control

#Cena Main:
func _on_Iniciar_pressed():
	#FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginInsti.tscn")
	FadeTransitions.fade_in("res://Cenas/SerialControl/SelectSerial.tscn")

func _on_Sair_pressed():
	get_tree().quit()  # Isso fecha o jogo
	
#---------------------------------------------------------------------------
func _on_Entrar_I_pressed():
	if $Background/Email.text.empty() or $Background/Senha.text.empty():
		$Background/messageError.text = "Please, enter your username and password"
		return
	Global.instituition = $Background/Email.text
	Firebase.login($Background/Email.text, $Background/Senha.text, $HTTPRequest)

func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var response_body := JSON.parse(body.get_string_from_ascii())
	if response_code != 200:
		$Background/messageError.text = response_body.result.error.message.capitalize()
		print($Background/messageError.text)
	else:
		$Background/messageError.text = "Sign in sucessful!"
		FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginFisio.tscn")
#-------------------------------------

#Cena Login/Registro de Paciente
func _on_Registrar_P_pressed():
	var CPF = $Background/LineEdit.text
	var nomeP = $Background/LineEdit2.text
	var inst = Global.get_instituition()
	
	Global.paciente_atual = nomeP
	Global.paciente_cpf = CPF
	
	var profile := {
		"name":{"stringValue": nomeP },
	}
	Firebase.save_document("Instituitions/"+inst+"/Pacientes?documentId=%s"%CPF,profile,$HTTPRequest_RP)
	#Firebase.save_document("Instituitions/"+inst+"/Pacientes/"+CPF+"/Jogos?documentId=%s"%"AsteroideTerapia",{},$HTTPRequest_RP)
	#Firebase.save_document("Instituitions/"+inst+"/Pacientes/"+CPF+"/Jogos?documentId=%s"%"PongTerapia",{},$HTTPRequest_RP)
	
	FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")

#-------------------------------

#Cena de Seleção de jogo
func _on_Ini_Jogo_pressed():
	var selected_index = $Background.jogoSelecionado
	if selected_index == 0:
		pass
	elif selected_index == 1:
		FadeTransitions.fade_in("res://Cenas/Jogo1.tscn")
		SimpleConsole.get_node("Camera2D").current = false
	elif selected_index == 2:
		FadeTransitions.fade_in("res://Cenas/jogo2.tscn")
		SimpleConsole.get_node("Camera2D").current = true



func _on_HTTPRequest_RP_request_completed(result, response_code, headers, body):
	var result_body := JSON.parse(body.get_string_from_ascii()).result as Dictionary
	match response_code:
		404:
			$messageError.text = "Please, enter your information"
			return
		200:
			$messageError.text = "Information saved successfully"
		_:
			print("Unhandled response code:", response_code)
