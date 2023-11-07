extends Control

var cpfs = []

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
			$Background/DropdownPacientes.add_item('Selecione o Paciente')
			if str(result_body) != "{}":	
				for document in result_body.documents:
					if document != null:
						var parts = document.name.split("/")
						var document_id = parts[parts.size() - 1]
						cpfs.append(document_id)
						$Background/DropdownPacientes.add_item(document.fields.name.stringValue)

func _on_novo_Registro_P_pressed():
	FadeTransitions.fade_in("res://Cenas/LoginseRegistros/RegistroPaciente.tscn")

		
func _on_Entrar_P_pressed():
	if $Background/DropdownPacientes.text != "Selecione o paciente":
		Global.paciente_atual = $Background/DropdownPacientes.text
		
		FadeTransitions.fade_in("res://Cenas/SelectGame.tscn")


func _on_DropdownPacientes_item_selected(index):
	Global.paciente_cpf = cpfs[index-1]
