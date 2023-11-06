extends Control

var information_sent := false
var result_body

func _ready() -> void:
	var inst = Global.get_instituition()
	Firebase.get_document("Instituitions/"+inst+"/Fisios", $HTTPRequest_LF)
	

func _on_HTTPRequest_LF_request_completed(result, response_code, headers, body):
	result_body = JSON.parse(body.get_string_from_ascii()).result as Dictionary
	
	match response_code:
		404:
			$Background/messageError.text = "Please, enter your information"
			return
		200:
			if information_sent:
				$Background/messageError.text = "Information saved successfully"
				information_sent = false
			
			$Background/DropdownFisios.add_item('Selecione o fisioterapeuta')
			for document in result_body.documents:
				if document != null:
					$Background/DropdownFisios.add_item(document.fields.name.stringValue)

func _on_DropdownFisios_item_selected(index):
	Global.currentFisio = result_body.documents[index-1].fields

func _on_Entrar_F_pressed():
	if $Background/DropdownFisios.text == 'Selecione o fisioterapeuta' or $Background/Senha.text.empty():
		$Background/messageError.text = "Please, enter your username and password"
		return
	Firebase.login(Global.get_fisio_email(), $Background/Senha.text, $HTTPRequest)

func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var response_body := JSON.parse(body.get_string_from_ascii())
	if response_code != 200:
		$Background/messageError.text = response_body.result.error.message.capitalize()
		print($Background/messageError.text)
	else:
		$Background/messageError.text = "Sign in sucessful!"
		FadeTransitions.fade_in("res://Cenas/LoginseRegistros/LoginPaciente.tscn")
