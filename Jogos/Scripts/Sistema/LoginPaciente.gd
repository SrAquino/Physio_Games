extends Control

func _ready() -> void:
	var inst = Global.get_instituition()
	Firebase.get_document("Instituitions/"+inst+"/Pacientes", $HTTPRequest_LP)
	

func _on_HTTPRequest_LP_request_completed(result, response_code, headers, body):
	var result_body = JSON.parse(body.get_string_from_ascii()).result as Dictionary
	match response_code:
		404:
			$Background/messageError.text = "Please, enter your information"
			return
		200:				
			for document in result_body.documents:
				if document != null:
					$Background/DropdownPacientes.add_item(document.fields.name.stringValue)

func _on_novo_Registro_P_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroPaciente.tscn")

		
func _on_Entrar_P_pressed():
	if $Background/DropdownPacientes.text != "Selecione o paciente":
		Global.paciente_atual = $Background/DropdownPacientes.text
		FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")
